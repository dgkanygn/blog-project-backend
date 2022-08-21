import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  profileImage: {
    type: String,
  },

  favoriteContents: {
    type: Array,
    default: [],
  },
});

export default mongoose.model("User", userSchema);
