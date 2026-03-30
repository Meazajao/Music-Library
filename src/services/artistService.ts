import { db } from "../config/mysql";

export const getArtists = async () => {
  const [artists] = await db.query("SELECT * FROM artists");
  return artists;
};

export const getTop3Artists = async () => {
  const [artists] = await db.query(
    "SELECT * FROM artists ORDER BY play_count DESC LIMIT 3"
  );
  return artists;
};

export const getArtist = async (id: number) => {
  const [rows]: any = await db.query(
    "SELECT * FROM artists WHERE id = ?",
    [id]
  );

  return rows[0];
};