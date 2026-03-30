import { Request, Response } from "express";
import { getSongs, getSongById } from "../services/songService";

export const getAllSongs = async (req: Request, res: Response) => {
  try {
    const songs = await getSongs();
    res.json(songs);
  } catch (error: any) {
    console.error("GET ALL SONGS ERROR:", error);
    res.status(500).json({
      message: error?.sqlMessage || error?.message || "Something went wrong"
    });
  }
};

export const getSong = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const song = await getSongById(id);
    res.json(song);
  } catch (error: any) {
    console.error("GET SONG ERROR:", error);
    res.status(500).json({
      message: error?.sqlMessage || error?.message || "Something went wrong"
    });
  }
};