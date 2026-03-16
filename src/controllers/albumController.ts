import { Request, Response } from "express";
import { getAlbums, getAlbumById } from "../services/albumService";

export const getAllAlbums = async (req: Request, res: Response) => {
  try {
    const albums = await getAlbums();
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAlbum = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const album = await getAlbumById(id);
    res.json(album);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};