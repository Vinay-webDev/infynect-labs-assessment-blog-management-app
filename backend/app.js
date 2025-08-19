import express from "express";
import cors from "cors";
import sequelize from "./lib/db.js";
import "./model/User.js";
import "./model/Posts.js";
import authRoutes from "./routes/router.auth.js";
import postRoutes from "./routes/router.posts.js";
import userRoutes from "./routes/router.user.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => res.json({ ok: true }));


app.use("/api/auth", authRoutes);
app.use("/api/blogs", postRoutes);
app.use("/api/profile", userRoutes);


export async function initDb() {
  await sequelize.sync();
}

export default app;
