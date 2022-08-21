import express from "express";
import {
  addContent,
  deleteContent,
  getAllContents,
  getByIdContent,
  getByUserIdContent,
  likeContent,
  updateContent,
} from "../controllers/contentController.js";

const contentRouter = express.Router();

contentRouter.get("/", getAllContents);
contentRouter.post("/add", addContent);
contentRouter.put("/update/:id", updateContent);
contentRouter.get("/:id", getByIdContent);
contentRouter.delete("/delete/:id", deleteContent);
contentRouter.put("/like/:id", likeContent);
contentRouter.get("/getByUserIdContent/:id", getByUserIdContent);

export default contentRouter;
