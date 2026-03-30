import { getTopArtists } from "./api.js";

const topArtistsContainer = document.getElementById("top-artists");

if (topArtistsContainer) {
  getTopArtists()
    .then((data) => {
      topArtistsContainer.innerHTML = "";

      data.forEach((artist) => {
        const artistDiv = document.createElement("div");

        artistDiv.innerHTML = `
          <h3>${artist.name}</h3>
          <p><strong>Genre:</strong> ${artist.genre}</p>
          <p>${artist.bio}</p>
          <hr />
        `;

        topArtistsContainer.appendChild(artistDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching top artists:", error);
      topArtistsContainer.innerHTML = "<p>Kunde inte ladda artister.</p>";
    });
}

const loginStatus = document.getElementById("loginStatus");
const logoutBtn = document.getElementById("logoutBtn");

const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

if (token && username) {
  loginStatus.textContent = `Välkommen, ${username}. Du är inloggad.`;
  logoutBtn.style.display = "inline-block";
} else {
  loginStatus.textContent = "Du är inte inloggad.";
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  window.location.href = "login.html";
});