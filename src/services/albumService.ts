import {db} from "../config/mysql";

export const getAlbums = async () => {
    const [rows] = await db.query("SELECT * FROM albums");
    return rows;
};

export const getAlbumById = async (id: number) => {
    const [rows] = await db.query
        ("SELECT * FROM albums WHERE id = ?", [id]);
        return rows;
};