import {db} from "../config/mysql";

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