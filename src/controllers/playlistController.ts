import { Request, Response } from "express";
import { createPlaylist, getPlaylists, deletePlaylist } from "../services/playlistService";


export const createNewPlaylist = async (req: Request, res: Response) => {
  try {
    const { name, user_id } = req.body;
    const playlist = await createPlaylist(name, user_id);
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllPlaylists = async (req: Request, res: Response) => {
  try {
    const playlists = await getPlaylists();
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const removePlaylist = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await deletePlaylist(id);
    res.json({ message: "Playlist deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};