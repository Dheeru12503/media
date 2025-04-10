const postMdodel = require("../models/postModel");

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    await postMdodel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: true,
      message: err.message,
    });
  }
};
