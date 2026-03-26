const BASE_URL = "http://127.0.0.1:3000";

export async function fetchArtists() {
  const response = await fetch(`${BASE_URL}/artists`);
  if (!response.ok) throw new Error("Kunde inte hämta artister");
  return await response.json();
}

export async function fetchArtistById(id) {
  const response = await fetch(`${BASE_URL}/artists/${id}`);
  if (!response.ok) throw new Error("Kunde inte hämta artist");
  return await response.json();
}

export async function fetchAlbums() {
  const response = await fetch(`${BASE_URL}/albums`);
  if (!response.ok) throw new Error("Kunde inte hämta album");
  return await response.json();
}

export async function fetchSongs() {
  const response = await fetch(`${BASE_URL}/songs`);
  if (!response.ok) throw new Error("Kunde inte hämta songs");
  return await response.json();
}

export async function fetchSongsByAlbumId(albumId) {
  const response = await fetch(`${BASE_URL}/songs`);
  if (!response.ok) throw new Error("Kunde inte hämta songs");

  const songs = await response.json();
  return songs.filter((song) => song.album_id == albumId);
}

export async function fetchPlaylists() {
  const response = await fetch(`${BASE_URL}/playlists`);
  if (!response.ok) throw new Error("Kunde inte hämta playlists");
  return await response.json();
}

export async function createPlaylist(data) {
  const response = await fetch(`${BASE_URL}/playlists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error("Kunde inte skapa playlist");
  return await response.json();
}

export async function fetchPlaylistSongs(playlistId) {
  const response = await fetch(`${BASE_URL}/playlists/${playlistId}/songs`);
  if (!response.ok) throw new Error("Kunde inte hämta songs i playlist");
  return await response.json();
}

export async function addSongToPlaylist(playlistId, song_id) {
  const response = await fetch(`${BASE_URL}/playlists/${playlistId}/songs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ song_id })
  });

  if (!response.ok) throw new Error("Kunde inte lägga till song i playlist");
  return await response.json();
}

export async function removeSongFromPlaylist(playlistId, songId) {
  const response = await fetch(
    `${BASE_URL}/playlists/${playlistId}/songs/${songId}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) throw new Error("Kunde inte ta bort song från playlist");
  return await response.json();
}