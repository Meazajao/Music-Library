import express from "express";
import { getAllAlbums, getAlbum } from "../controllers/albumController";

const router = express.Router();

router.get("/", getAllAlbums);
router.get("/:id", getAlbum);

export default router;