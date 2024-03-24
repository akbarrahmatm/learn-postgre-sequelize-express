const { Post } = require("../models");

const getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json({
      status: "Success",
      totalData: posts.length,
      requestAt: req.requestTime,
      data: { posts },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = {
  getAllPost,
};
