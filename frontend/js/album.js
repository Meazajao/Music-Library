import { fetchAlbums, fetchSongsByAlbumId } from "./api.js";

const albumContainer = document.getElementById("albumContainer");
const songsContainer = document.getElementById("songsContainer");
const message = document.getElementById("message");

function getAlbumIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadAlbumPage() {
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

    message.textContent = "";

    albumContainer.innerHTML = `
      <h1>${album.title}</h1>
      <p><strong>Release year:</strong> ${album.release_year}</p>
      <p><strong>Artist id:</strong> ${album.artist_id}</p>
    `;

    songsContainer.innerHTML = "";

    if (songs.length === 0) {
      songsContainer.innerHTML = "<p>Inga songs hittades för detta album.</p>";
      return;
    }

    songs.forEach((song) => {
      const songCard = document.createElement("div");
      songCard.classList.add("card");

      songCard.innerHTML = `
        <h3>${song.title}</h3>
        <p><strong>Duration:</strong> ${song.duration}</p>
      `;

      songsContainer.appendChild(songCard);
    });
  } catch (error) {
    message.textContent = error.message;
  }
}

loadAlbumPage();