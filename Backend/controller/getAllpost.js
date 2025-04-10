const postMdodel = require("../models/postModel");

exports.getAllPost = async (req, res) => {
  try {
    const posts = await postMdodel.find({});
    res.status(200).json({
      success: true,
      data: posts,
      message: "Get all posts successfully ",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: err.message,
    });
  }
};
