import commentModel from "../models/commentModel.js";

export const getAllComments = async (req, res, next) => {
  let comments;
  try {
    comments = await commentModel.find();
  } catch (err) {
    return console.log(err);
  }
  if (!comments) {
    return res.status(404).json({ message: "no comments found" });
  }

  return res.status(200).json({ comments });
};

export const addComment = async (req, res, next) => {
  const { newComment, contentID, owner, ownerImage } = req.body;

  try {
    const comment = await commentModel.create({
      newComment,
      contentID,
      owner,
      ownerImage,
    });

    return res.status(200).json({ comment });
  } catch (err) {
    return console.log(err);
  }
};

export const updateComment = async (req, res, next) => {
  const { newComment } = req.body;
  const commentID = req.params.id;
  let comment;
  try {
    comment = await commentModel.findByIdAndUpdate(commentID, {
      newComment,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!comment) {
    return res.status(500).json({ message: "this comment couldn't updated" });
  }
  return res.status(200).json({ comment });
};

export const getByIdComment = async (req, res, next) => {
  const id = req.params.id;
  let comment;
  try {
    comment = await commentModel.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!comment) {
    return res.status(404).json({ message: "no comment found" });
  }

  return res.status(200).json({ comment });
};

export const deleteComment = async (req, res, next) => {
  const id = req.params.id;
  let comment;
  try {
    comment = await commentModel.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }

  if (!comment) {
    return res.status(400).json({ message: "this comment couldn't delete" });
  }

  return res.status(200).json({ message: "successfully delete" });
};

export const getByContentIdComments = async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await commentModel.find({ contentID: id });

    return res.status(200).json({ comments });
  } catch (error) {
    console.log(error);
  }
};

export const likeComment = async (req, res, next) => {
  const { userID } = req.body;

  try {
    const comment = await commentModel.findById(req.params.id);

    if (!comment.likes.includes(userID)) {
      const updated = await commentModel.findByIdAndUpdate(
        req.params.id,
        { $push: { likes: userID } },
        { new: true }
      );

      return res.status(200).json({ message: "like koyuldu", updated });
    } else if (comment.likes.includes(userID)) {
      const updated = await commentModel.findByIdAndUpdate(
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
