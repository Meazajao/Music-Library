import { Request, Response } from "express";
import { getArtists, getTop3Artists, getArtist, updateArtistById } from "../services/artistService";

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

export const updateArtist = async (req: Request, res: Response) => {
  try {
    const { name, genre, bio, play_count } = req.body;
    const id = Number(req.params.id);

    await updateArtistById(id, name, genre, bio, play_count);

    res.json({ message: "Artist updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating artist" });
  }
};