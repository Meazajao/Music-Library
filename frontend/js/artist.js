import { fetchArtistById } from "./api.js";

const artistContainer = document.getElementById("artistContainer");
const message = document.getElementById("message");

function getArtistIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadArtist() {
  try {
    const id = getArtistIdFromUrl();

    if (!id) {
      throw new Error("Inget artist-id hittades i URL:en");
    }

    const artist = await fetchArtistById(id);

    message.textContent = "";
    artistContainer.innerHTML = `
      <h1>${artist.name}</h1>
      <p><strong>Genre:</strong> ${artist.genre}</p>
      <p><strong>Bio:</strong> ${artist.bio}</p>
      <p><strong>Play count:</strong> ${artist.play_count}</p>
    `;
  } catch (error) {
    message.textContent = error.message;
  }
}

loadArtist();