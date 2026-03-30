import {
    fetchAlbums,
    fetchSongsByAlbumId,
    fetchPlaylists,
    addSongToPlaylist
  } from "./api.js";
  
  const albumContainer = document.getElementById("albumContainer");
  const songsContainer = document.getElementById("songsContainer");
  const message = document.getElementById("message");
  
  function getAlbumIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }
  
  function isLoggedIn() {
    return !!localStorage.getItem("token");
  }
  
  function getCurrentUserId() {
    return Number(localStorage.getItem("userId"));
  }
  
  async function loadAlbum() {
    try {
      const albumId = getAlbumIdFromUrl();
  
      if (!albumId) {
        throw new Error("Inget album-id hittades i URL:en");
      }
  
      const albums = await fetchAlbums();
      const album = albums.find((item) => item.id == albumId);
  
      if (!album) {
        throw new Error("Album hittades inte");
      }
  
      const songs = await fetchSongsByAlbumId(albumId);
  
      let myPlaylists = [];
      if (isLoggedIn()) {
        const playlists = await fetchPlaylists();
        const currentUserId = getCurrentUserId();
  
        myPlaylists = playlists.filter(
          (playlist) => playlist.user_id === currentUserId
        );
      }
  
      message.textContent = "";
  
      albumContainer.innerHTML = `
        <h1>${album.title}</h1>
        <p><strong>Release year:</strong> ${album.release_year}</p>
        <p><strong>Artist id:</strong> ${album.artist_id}</p>
      `;
  
      songsContainer.innerHTML = "";
  
      if (songs.length === 0) {
        songsContainer.innerHTML = "<p>Inga songs hittades i detta album.</p>";
        return;
      }
  
      songs.forEach((song) => {
        const card = document.createElement("div");
        card.classList.add("card");
  
        let playlistPart = `
          <p>Logga in först för att lägga till i playlist</p>
        `;
  
        if (isLoggedIn()) {
          if (myPlaylists.length === 0) {
            playlistPart = `
              <p>Du har inga playlists ännu. Skapa en playlist först.</p>
            `;
          } else {
            const options = myPlaylists
              .map((playlist) => {
                return `<option value="${playlist.id}">${playlist.name}</option>`;
              })
              .join("");
  
            playlistPart = `
              <select class="playlistSelect">
                <option value="">Välj playlist</option>
                ${options}
              </select>
              <button class="addSongBtn" data-song-id="${song.id}">
                Lägg till
              </button>
            `;
          }
        }
  
        card.innerHTML = `
          <h3>${song.title}</h3>
          <p><strong>Duration:</strong> ${song.duration}</p>
          ${playlistPart}
        `;
  
        songsContainer.appendChild(card);
      });
    } catch (error) {
      message.textContent = error.message;
    }
  }
  
  songsContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("addSongBtn")) {
      try {
        const songId = event.target.dataset.songId;
        const card = event.target.closest(".card");
        const select = card.querySelector(".playlistSelect");
        const playlistId = select.value;
  
        if (!playlistId) {
          message.textContent = "Välj en playlist först";
          return;
        }
  
        await addSongToPlaylist(playlistId, Number(songId));
        message.textContent = "Song tillagd i playlist";
      } catch (error) {
        message.textContent = error.message;
      }
    }
  });
  
  loadAlbum();