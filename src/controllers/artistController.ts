import { Request, Response } from "express";
import { getArtists, getTop3Artists } from "../services/artistService";

export const getAllArtists = async (req: Request, res: Response) => {
  try {
    const artists = await getArtists();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTopArtists = async (req: Request, res: Response) => {
  try {
    const artists = await getTop3Artists();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};