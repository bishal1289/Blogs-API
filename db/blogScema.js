const mongoose = require("mongoose");
const { Schema } = mongoose;
const blogsScema = new mongoose.Schema(
  {
    author: String,
    title: String,
    desc: String,
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const blog = mongoose.model("blog", blogsScema);
module.exports = blog;
