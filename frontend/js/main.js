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