import { Request, Response } from "express";
import {
  createPlaylist,
  getPlaylists,
  deletePlaylist,
  addSongToPlaylist,
  getSongsInPlaylist,
  removeSongFromPlaylist
} from "../services/playlistService";

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

export const addSong = async (req: Request, res: Response) => {
  try {
    const playlistId = Number(req.params.playlistId);
    const { song_id } = req.body;

    const result = await addSongToPlaylist(playlistId, Number(song_id));
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPlaylistSongs = async (req: Request, res: Response) => {
  try {
    const playlistId = Number(req.params.playlistId);
    const songs = await getSongsInPlaylist(playlistId);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const removeSong = async (req: Request, res: Response) => {
  try {
    const playlistId = Number(req.params.playlistId);
    const songId = Number(req.params.songId);

    await removeSongFromPlaylist(playlistId, songId);
    res.json({ message: "Song removed from playlist" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};