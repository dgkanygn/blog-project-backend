import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  newComment: {
    type: String,
    required: true,
  },

  contentID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Content",
  },

  owner: {
    type: String,
    required: true,
  },

  ownerImage: {
    type: String,
  },

  likes: {
    type: Array,
    default: [],
  },
});

export default mongoose.model("Comment", commentSchema);
