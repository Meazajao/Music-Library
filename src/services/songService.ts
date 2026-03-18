import {db} from "../config/mysql";

export const getSongs = async () => {
  const [rows] = await db.query("SELECT * FROM songs");
  return rows;
};

export const getSongById = async (id: number) => {
  const [rows] = await db.query(
    "SELECT * FROM songs WHERE id = ?",
    [id]
  );
  return rows;
};