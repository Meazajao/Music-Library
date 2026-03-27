import express from "express";
import {
  createNewPlaylist,
  getAllPlaylists,
  removePlaylist,
  addSong,
  getPlaylistSongs,
  removeSong
} from "../controllers/playlistController";

const router = express.Router();

router.post("/", createNewPlaylist);
router.get("/", getAllPlaylists);
router.delete("/:id", removePlaylist);

router.post("/:playlistId/songs", addSong);
router.get("/:playlistId/songs", getPlaylistSongs);
router.delete("/:playlistId/songs/:songId", removeSong);

export default router;