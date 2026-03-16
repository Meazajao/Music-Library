import express from "express";
import cors from "cors";

import artistRoutes from "./routes/artistRoutes";
import authRoutes from "./routes/authRoutes";
import { verifyToken } from "./middlewares/authMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/artists", artistRoutes);
app.use("/auth", authRoutes);


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
