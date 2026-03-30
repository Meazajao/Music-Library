import { fetchArtists } from "./api.js";

const artistsContainer = document.getElementById("artistsContainer");
const message = document.getElementById("message");

async function loadArtists() {
  try {
    const artists = await fetchArtists();

    message.textContent = "";
    artistsContainer.innerHTML = "";

    artists.forEach((artist) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h2>${artist.name}</h2>
        <p><strong>Genre:</strong> ${artist.genre}</p>
        <p><strong>Bio:</strong> ${artist.bio}</p>
        <p><strong>Play count:</strong> ${artist.play_count}</p>
        <a href="artist.html?id=${artist.id}">Se artist</a>
      `;

      artistsContainer.appendChild(card);
    });
  } catch (error) {
    message.textContent = error.message;
  }
}

loadArtists();