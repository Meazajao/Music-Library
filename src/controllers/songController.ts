import { Request, Response } from "express";
import { getSongs, getSongById } from "../services/songService";

export const getAllSongs = async (req: Request, res: Response) => {
  try {
    const songs = await getSongs();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getSong = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const song = await getSongById(id);
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};