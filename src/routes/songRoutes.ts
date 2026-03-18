import express from "express";
import { getAllSongs, getSong } from "../controllers/songController";

const router = express.Router();

router.get("/", getAllSongs);
router.get("/:id", getSong);

export default router;