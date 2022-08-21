import mongoose from "mongoose";

const Schema = mongoose.Schema;

const contentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    newContent: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    userImage: {
      type: String,
    },

    likes: {
      type: Array,
      default: [],
    },

    favorites: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Content", contentSchema);
