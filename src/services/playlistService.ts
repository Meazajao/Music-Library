import { db } from "../config/mysql";

export const createPlaylist = async (name: string, user_id: number) => {
  const [result] = await db.query(
    "INSERT INTO playlists (name, user_id) VALUES (?, ?)",
    [name, user_id]
  );
  return result;
};

export const getPlaylists = async () => {
  const [rows] = await db.query("SELECT * FROM playlists");
  return rows;
};

export const deletePlaylist = async (id: number) => {
  await db.query("DELETE FROM playlists WHERE id = ?", [id]);
};

export const addSongToPlaylist = async (playlistId: number, songId: number) => {
  const [result] = await db.query(
    "INSERT INTO playlist_songs (playlist_id, song_id) VALUES (?, ?)",
    [playlistId, songId]
  );
  return result;
};

export const getSongsInPlaylist = async (playlistId: number) => {
  const [rows] = await db.query(
    `SELECT songs.*
     FROM playlist_songs
     JOIN songs ON playlist_songs.song_id = songs.id
     WHERE playlist_songs.playlist_id = ?`,
    [playlistId]
  );
  return rows;
};

export const removeSongFromPlaylist = async (playlistId: number, songId: number) => {
  await db.query(
    "DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?",
    [playlistId, songId]
  );
};