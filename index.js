import express from "express";
import userRouter from "./routers/userRouter.js";
// import { connectDataBase } from "./database.js";
import { connectDB } from "./db.js";
import contentRouter from "./routers/contentRoutes.js";
import commentRouter from "./routers/commentRouter.js";
import cors from "cors";
import dotenv from "dotenv";

import path from "path";
const __dirname = path.resolve();

dotenv.config();

const app = express();

app.use(cors());

const port = 3001;

app.use(express.json());

app.use("/users", userRouter);
app.use("/contents", contentRouter);
app.use("/comments", commentRouter);

app.listen(process.env.PORT || port, () => {
  console.log(`example app listening on port ${port}`);
  connectDB();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
