import { fetchAlbums } from "./api.js";

const albumsContainer = document.getElementById("albumsContainer");
const message = document.getElementById("message");

async function loadAlbums() {
  try {
    const albums = await fetchAlbums();

    message.textContent = "";
    albumsContainer.innerHTML = "";

    albums.forEach((album) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h2>${album.title}</h2>
        <p><strong>Release year:</strong> ${album.release_year}</p>
        <p><strong>Artist id:</strong> ${album.artist_id}</p>
      `;

      albumsContainer.appendChild(card);
    });
  } catch (error) {
    message.textContent = error.message;
  }
}

loadAlbums();