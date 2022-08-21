import express from "express";
import {
  addFavoriteContent,
  getAllUser,
  getByNameUser,
  login,
  register,
  getUserFavsAndContents,
  deleteProfile,
} from "../controllers/userController.js";

import { upload } from "../helpers/multer.js";

const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.post("/register", upload, register);
userRouter.post("/login", login);
userRouter.delete("/deleteProfile/:id", deleteProfile);
userRouter.get("/:username", getByNameUser);
userRouter.put("/addFavorite/:id", addFavoriteContent);
userRouter.get("/getUserFavsAndContents/:id", getUserFavsAndContents);

export default userRouter;
