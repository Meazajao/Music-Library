import {
    fetchPlaylists,
    createPlaylist,
    fetchPlaylistSongs,
    removeSongFromPlaylist
  } from "./api.js";
  
  const message = document.getElementById("message");
  const playlistContainer = document.getElementById("playlistContainer");
  const playlistSongsContainer = document.getElementById("playlistSongsContainer");
  const playlistDetails = document.getElementById("playlistDetails");
  
  const playlistForm = document.getElementById("playlistForm");
  const playlistNameInput = document.getElementById("playlistName");
  const showCreateFormBtn = document.getElementById("showCreateFormBtn");
  
  let currentPlaylistId = null;
  
  function isLoggedIn() {
    return !!localStorage.getItem("token");
  }
  
  function getCurrentUserId() {
    return Number(localStorage.getItem("userId"));
  }
  
  function getCurrentUsername() {
    return localStorage.getItem("username");
  }
  
  showCreateFormBtn.addEventListener("click", () => {
    if (!isLoggedIn()) {
      message.textContent = "Logga in först för att skapa en playlist";
      return;
    }
  
    playlistForm.classList.toggle("hidden");
  });
  
  async function loadPlaylists() {
    try {
      const playlists = await fetchPlaylists();
      const currentUserId = getCurrentUserId();
  
      playlistContainer.innerHTML = "";
      message.textContent = "";
  
      const myPlaylists = playlists.filter(
        (playlist) => playlist.user_id === currentUserId
      );
  
      if (myPlaylists.length === 0) {
        playlistContainer.innerHTML = "<p>Du har inga playlists än.</p>";
        return;
      }
  
      myPlaylists.forEach((playlist) => {
        const item = document.createElement("button");
        item.classList.add("playlist-item");
        item.textContent = playlist.name;
        item.dataset.id = playlist.id;
        item.dataset.name = playlist.name;
  
        playlistContainer.appendChild(item);
      });
    } catch (error) {
      message.textContent = error.message;
    }
  }
  
  playlistForm.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    if (!isLoggedIn()) {
      message.textContent = "Logga in först för att skapa en playlist";
      return;
    }
  
    try {
      const name = playlistNameInput.value;
      const user_id = getCurrentUserId();
  
      await createPlaylist({ name, user_id });
  
      playlistNameInput.value = "";
      playlistForm.classList.add("hidden");
      message.textContent = "Playlist skapad";
  
      loadPlaylists();
    } catch (error) {
      message.textContent = error.message;
    }
  });
  
  playlistContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("playlist-item")) {
      try {
        const playlistId = Number(event.target.dataset.id);
        const playlistName = event.target.dataset.name;
  
        currentPlaylistId = playlistId;
  
        const songs = await fetchPlaylistSongs(playlistId);
  
        playlistDetails.innerHTML = `
          <h2>${playlistName}</h2>
          <p>Songs</p>
        `;
  
        playlistSongsContainer.innerHTML = "";
  
        if (songs.length === 0) {
          playlistSongsContainer.innerHTML = "<p>Inga låtar i denna playlist ännu.</p>";
          return;
        }
  
        songs.forEach((song) => {
          const songRow = document.createElement("div");
          songRow.classList.add("song-row");
  
          songRow.innerHTML = `
            <div>
              <h3>${song.title}</h3>
              <p>Duration: ${song.duration}</p>
            </div>
            <button class="remove-song-btn" data-song="${song.id}">
              Ta bort
            </button>
          `;
  
          playlistSongsContainer.appendChild(songRow);
        });
      } catch (error) {
        message.textContent = error.message;
      }
    }
  });
  
  playlistSongsContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("remove-song-btn")) {
      if (!isLoggedIn()) {
        message.textContent = "Logga in först";
        return;
      }
  
      try {
        const songId = Number(event.target.dataset.song);
  
        await removeSongFromPlaylist(currentPlaylistId, songId);
  
        const songs = await fetchPlaylistSongs(currentPlaylistId);
        playlistSongsContainer.innerHTML = "";
  
        if (songs.length === 0) {
          playlistSongsContainer.innerHTML = "<p>Inga låtar i denna playlist ännu.</p>";
          message.textContent = "Låt borttagen från playlist";
          return;
        }
  
        songs.forEach((song) => {
          const songRow = document.createElement("div");
          songRow.classList.add("song-row");
  
          songRow.innerHTML = `
            <div>
              <h3>${song.title}</h3>
              <p>Duration: ${song.duration}</p>
            </div>
            <button class="remove-song-btn" data-song="${song.id}">
              Ta bort
            </button>
          `;
  
          playlistSongsContainer.appendChild(songRow);
        });
  
        message.textContent = "Låt borttagen från playlist";
      } catch (error) {
        message.textContent = error.message;
      }
    }
  });
  
  if (!isLoggedIn()) {
    message.textContent = "Du är inte inloggad";
  } else {
    message.textContent = `Inloggad som ${getCurrentUsername()}`;
  }
  
  loadPlaylists();