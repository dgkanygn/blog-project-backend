import express from "express";
import {
  addComment,
  getAllComments,
  updateComment,
  getByIdComment,
  deleteComment,
  getByContentIdComments,
  likeComment,
} from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.get("/", getAllComments);
commentRouter.post("/add", addComment);
commentRouter.put("/update/:id", updateComment);
commentRouter.get("/:id", getByIdComment);
commentRouter.delete("/delete/:id", deleteComment);
commentRouter.get("/getByContentIdComments/:id", getByContentIdComments);
commentRouter.put("/like/:id", likeComment);

export default commentRouter;
