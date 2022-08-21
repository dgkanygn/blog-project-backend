import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import contentModel from "../models/contentModel.js";
import commentModel from "../models/commentModel.js";

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await userModel.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "users not found" });
  }
  return res.status(200).json({ users });
};

export const register = async (req, res, next) => {
  const { username, email, password, bio } = req.body;

  let profileImage = req.file.path;

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "zaten bir hesabınız var, giriş yapın" });
    } else if (!user) {
      const hashedPassword = bcryptjs.hashSync(password);

      const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
        bio,
        profileImage,
      });

      return res.status(201).json({ user });
    }
  } catch (err) {
    return console.log(err);
  }
};

export const login = async (req, res, next) => {
  const generateToken = () => {
    let token = jwt.sign({ test: "test" }, "gizli");
    return token;
  };

  const { email, password } = req.body;
  let existingUser;
  existingUser = await userModel.findOne({ email });
  try {
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({
      message: "Bu e-posta adresi ile kayıtlı bir kullanıcı bulunamıyor",
    });
  }

  const isPasswordCorrect = bcryptjs.compareSync(
    password,
    existingUser.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Şifre yanlış" });
  }
  return res.status(200).json({
    message: "login successfull",
    existingUser,
    token: generateToken(),
  });
};

export const getByNameUser = async (req, res, next) => {
  const { username } = req.params;
  let existingUser;
  try {
    existingUser = await userModel.findOne({ username });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "no comment found" });
  }

  return res.status(200).json({ existingUser });
};

export const addFavoriteContent = async (req, res, next) => {
  const { contentID } = req.body;
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);
    if (!user.favoriteContents.includes(contentID)) {
      await user.updateOne({ $push: { favoriteContents: contentID } });
      return res.status(200).json("bu içerik favorilere eklendi");
    } else {
      await user.updateOne({ $pull: { favoriteContents: contentID } });
      return res.status(200).json("bu içerik favorilerden kaldırıldı");
    }
  } catch (error) {
    res.status(500).json(err);
  }
};

export const getUserFavsAndContents = async (req, res) => {
  try {
    const contents = await contentModel.find({ userName: req.params.id });
    const favs = await contentModel.find({ likes: req.params.id });

    return res.status(200).json({ contents, favs });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteProfile = async (req, res) => {
  const username = req.params.id;
  let contents;
  let comments;
  let user;

  let { password } = req.body;

  user = await userModel.findOne({ username: username });
  const isPasswordCorrect = bcryptjs.compareSync(password, user.password);

  if (isPasswordCorrect) {
    user.delete();
    comments = await commentModel.deleteMany({ owner: username });
    contents = await contentModel.deleteMany({ userName: username });
    return res.status(200).json({ message: "successfully delete" });
  } else {
    return res.status(400).json({ message: "Şifre yanlış" });
  }
};
