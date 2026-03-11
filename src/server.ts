import express from "express";
import cors from "cors";

import artistRoutes from "./routes/artistRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/artists", artistRoutes);

app.get("/", (req, res) => {
  res.send("Music Library API running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});