const API_BASE_URL = "http://localhost:3000";

async function getTopArtists() {
  const response = await fetch(`${API_BASE_URL}/artists/top3`);
  return response.json();
}