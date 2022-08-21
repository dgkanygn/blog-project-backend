import commentModel from "../models/commentModel.js";
import contentModel from "../models/contentModel.js";

export const getAllContents = async (req, res, next) => {
  let contents;
  try {
    contents = await contentModel.find();
  } catch (err) {
    return console.log(err);
  }
  if (!contents) {
    return res.status(404).json({ message: "no contents found" });
  }

  return res.status(200).json({ contents });
};

export const addContent = async (req, res, next) => {
  const { title, description, newContent, userName, userImage } = req.body;

  try {
    const content = await contentModel.create({
      title,
      description,
      newContent,
      userName,
      userImage,
    });

    return res.status(200).json({ content });
  } catch (err) {
    return console.log(err);
  }
};

export const updateContent = async (req, res, next) => {
  const { title, description, newContent } = req.body;
  const contentID = req.params.id;
  let content;
  try {
    content = await contentModel.findByIdAndUpdate(contentID, {
      title,
      description,
      newContent,
    });

    if (!content) {
      return res.status(500).json({ message: "this content couldn't updated" });
    } else {
      return res.status(200).json({ content });
    }
  } catch (err) {
    return console.log(err);
  }
};

export const getByIdContent = async (req, res, next) => {
  const id = req.params.id;
  let content;
  try {
    content = await contentModel.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!content) {
    return res.status(404).json({ message: "no content found" });
  }

  return res.status(200).json({ content });
};

export const deleteContent = async (req, res, next) => {
  const id = req.params.id;
  let content;
  let comments;
  try {
    content = await contentModel.findByIdAndRemove(id);
    comments = await commentModel.deleteMany({ contentID: id });
  } catch (err) {
    return console.log(err);
  }

  if (!content) {
    return res.status(400).json({ message: "this content couldn't delete" });
  }

  return res.status(200).json({ message: "successfully delete" });
};

export const likeContent = async (req, res, next) => {
  const { userID } = req.body;

  try {
    const content = await contentModel.findById(req.params.id);

    if (!content.likes.includes(userID)) {
      const updated = await contentModel.findByIdAndUpdate(
        req.params.id,
        { $push: { likes: userID } },
        { new: true }
      );

      return res.status(200).json({ message: "like koyuldu", updated });
    } else if (content.likes.includes(userID)) {
      const updated = await contentModel.findByIdAndUpdate(
        req.params.id,
        { $pull: { likes: userID } },
        { new: true }
      );
      return res.status(200).json({ message: "like kaldırıldı", updated });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getByUserIdContent = async (req, res, next) => {
  const username = req.params.id;

  try {
    const content = await contentModel.find({ userName: username });

    return res.status(200).json({ content });
  } catch (error) {
    return console.log(error);
  }
};
