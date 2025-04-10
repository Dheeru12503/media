const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    reactions: {
      likes: {
        type: String,
        required: true,
      },
      dislikes: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("postModel", postSchema);
