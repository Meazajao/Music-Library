const BASE_URL = "http://127.0.0.1:3000";

export async function fetchArtists() {
  const response = await fetch(`${BASE_URL}/artists`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta artister");
  }

  const data = await response.json();
  return data;
}

export async function fetchArtistById(id) {
  const response = await fetch(`${BASE_URL}/artists`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta artist");
  }

  const data = await response.json();
  const artist = data.find((item) => item.id == id);

  if (!artist) {
    throw new Error("Artist hittades inte");
  }

  return artist;
}

export async function fetchAlbums() {
  const response = await fetch(`${BASE_URL}/albums`);

  if (!response.ok) {
    throw new Error("Kunde inte hämta album");
  }

  const data = await response.json();
  return data;
}