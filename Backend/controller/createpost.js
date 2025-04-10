const postMdodel = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    const { title, body, tags, likes, dislikes } = req.body;

    const reactions = {
      likes: likes || 0,
      dislikes: dislikes || 0,
    };
    const savePost = await postMdodel.create({ title, body, tags, reactions });
    res.status(200).json({
      success: true,
      data: savePost,
      message: "Post created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: Error.message,
    });
  }
};
