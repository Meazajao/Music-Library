import express from "express";
import { getAllArtists, getTopArtists, getArtistById, updateArtist } from "../controllers/artistController";

const router = express.Router();

router.get("/", getAllArtists);
router.get("/top3", getTopArtists);
router.get("/:id", getArtistById);
router.put("/:id", updateArtist);

export default router;