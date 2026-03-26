import {
    fetchPlaylists,
    createPlaylist,
    fetchPlaylistSongs,
    addSongToPlaylist,
    removeSongFromPlaylist
  } from "./api.js";
  
  const message = document.getElementById("message");
  const playlistContainer = document.getElementById("playlistContainer");
  const playlistSongsContainer = document.getElementById("playlistSongsContainer");
  
  const playlistForm = document.getElementById("playlistForm");
  const playlistNameInput = document.getElementById("playlistName");
  const userIdInput = document.getElementById("userId");
  
  const addSongForm = document.getElementById("addSongForm");
  const playlistIdInput = document.getElementById("playlistIdInput");
  const songIdInput = document.getElementById("songIdInput");
  
  const showSongsForm = document.getElementById("showSongsForm");
  const showPlaylistIdInput = document.getElementById("showPlaylistId");
  
  async function loadPlaylists() {
    try {
      const playlists = await fetchPlaylists();
  
      message.textContent = "";
      playlistContainer.innerHTML = "";
  
      playlists.forEach((playlist) => {
        const card = document.createElement("div");
        card.classList.add("card");
  
        card.innerHTML = `
          <h3>${playlist.name}</h3>
          <p><strong>Playlist id:</strong> ${playlist.id}</p>
          <p><strong>User id:</strong> ${playlist.user_id}</p>
        `;
  
        playlistContainer.appendChild(card);
      });
    } catch (error) {
      message.textContent = error.message;
    }
  }
  
  playlistForm.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    try {
      const name = playlistNameInput.value;
      const user_id = Number(userIdInput.value);
  
      await createPlaylist({ name, user_id });
  
      playlistNameInput.value = "";
      userIdInput.value = "";
  
      loadPlaylists();
      message.textContent = "Playlist skapad";
    } catch (error) {
      message.textContent = error.message;
    }
  });
  
  addSongForm.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    try {
      const playlistId = Number(playlistIdInput.value);
      const songId = Number(songIdInput.value);
  
      await addSongToPlaylist(playlistId, songId);
  
      playlistIdInput.value = "";
      songIdInput.value = "";
  
      message.textContent = "Song tillagd i playlist";
    } catch (error) {
      message.textContent = error.message;
    }
  });
  
  showSongsForm.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    try {
      const playlistId = Number(showPlaylistIdInput.value);
      const songs = await fetchPlaylistSongs(playlistId);
  
      playlistSongsContainer.innerHTML = "";
  
      if (songs.length === 0) {
        playlistSongsContainer.innerHTML = "<p>Inga songs i denna playlist.</p>";
        return;
      }
  
      songs.forEach((song) => {
        const card = document.createElement("div");
        card.classList.add("card");
  
        card.innerHTML = `
          <h3>${song.title}</h3>
          <p><strong>Song id:</strong> ${song.id}</p>
          <p><strong>Duration:</strong> ${song.duration}</p>
          <button data-playlist="${playlistId}" data-song="${song.id}" class="remove-song-btn">
            Ta bort song
          </button>
        `;
  
        playlistSongsContainer.appendChild(card);
      });
  
      message.textContent = "";
    } catch (error) {
      message.textContent = error.message;
    }
  });
  
  playlistSongsContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("remove-song-btn")) {
      try {
        const playlistId = Number(event.target.dataset.playlist);
        const songId = Number(event.target.dataset.song);
  
        await removeSongFromPlaylist(playlistId, songId);
  
        const songs = await fetchPlaylistSongs(playlistId);
        playlistSongsContainer.innerHTML = "";
  
        songs.forEach((song) => {
          const card = document.createElement("div");
          card.classList.add("card");
  
          card.innerHTML = `
            <h3>${song.title}</h3>
            <p><strong>Song id:</strong> ${song.id}</p>
            <p><strong>Duration:</strong> ${song.duration}</p>
            <button data-playlist="${playlistId}" data-song="${song.id}" class="remove-song-btn">
              Ta bort song
            </button>
          `;
  
          playlistSongsContainer.appendChild(card);
        });
  
        message.textContent = "Song borttagen från playlist";
      } catch (error) {
        message.textContent = error.message;
      }
    }
  });
  
  loadPlaylists();