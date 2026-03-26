import { fetchSongs, fetchPlaylists, addSongToPlaylist } from "./api.js";

const songsContainer = document.getElementById("songsContainer");
const message = document.getElementById("message");

async function loadSongs() {
  try {
    const songs = await fetchSongs();
    const playlists = await fetchPlaylists();

    message.textContent = "";
    songsContainer.innerHTML = "";

    songs.forEach((song) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const playlistOptions = playlists
        .map((playlist) => {
          return `<option value="${playlist.id}">${playlist.name}</option>`;
        })
        .join("");

      card.innerHTML = `
        <h2>${song.title}</h2>
        <p><strong>Duration:</strong> ${song.duration}</p>
        <p><strong>Album id:</strong> ${song.album_id}</p>

        <select class="playlistSelect">
          <option value="">Välj playlist</option>
          ${playlistOptions}
        </select>

        <button class="addSongBtn" data-song-id="${song.id}">
          Lägg till i playlist
        </button>
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

loadSongs();