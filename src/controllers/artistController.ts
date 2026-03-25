import { Request, Response } from "express";
import { getArtists, getTop3Artists, getArtist } from "../services/artistService";

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

export const getArtistById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const artist = await getArtist(id);

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};