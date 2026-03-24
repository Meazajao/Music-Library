import express from "express";
import cors from "cors";

import artistRoutes from "./routes/artistRoutes";
import albumRoutes from "./routes/albumRoutes";
import authRoutes from "./routes/authRoutes";
import { verifyToken } from "./middlewares/authMiddleware";
import review from "./models/review";
import reviewRoutes from "./routes/reviewRoutes";
import { connectMongo } from "./config/mongo";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/artists", artistRoutes);
app.use("/albums", albumRoutes);
app.use("/api", reviewRoutes);


app.get("/", (req, res) => {
  res.send("Music Library API running");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


//skyddad route, kanske bättre att lägga den i artistRoutes?
app.get("/protected", verifyToken, (req, res) => {
  res.send("This is a protected route");
});

//protected dashboard route
app.get("/dashboard", verifyToken, (req, res) => {
   res.json({ message: "Welcome to the dashboard!", user: (req as any).user });
});

connectMongo();
