import express from "express";
import { createNewPlaylist, getAllPlaylists, removePlaylist } from "../controllers/playlistController";

const router = express.Router();


router.post("/", createNewPlaylist);
router.get("/", getAllPlaylists);
router.delete("/:id", removePlaylist);

export default router;