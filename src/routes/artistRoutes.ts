import express from "express";
import { getAllArtists, getTopArtists } from "../controllers/artistController";

const router = express.Router();

router.get("/", getAllArtists);
router.get("/top3", getTopArtists);

export default router;