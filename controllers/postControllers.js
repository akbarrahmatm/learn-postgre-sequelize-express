const { Post } = require("../models");
const services = require("../services");

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

const createPost = async (req, res, next) => {
  try {
    const data = await req.body;
    const errors = await services.createPostValidation(data);

    if (errors.length === 0) {
      Post.create({
        title: data.title,
        body: data.body,
        approved: data.approved,
      })
        .then(
          res.status(201).json({
            status: "Success",
            data: {
              data,
            },
          })
        )
        .catch((err) => {
          res.status(400).json({
            status: "Failed",
            message: err,
          });
          return;
        });
    } else {
      throw new Error(errors.join("; "));
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = {
  getAllPost,
  createPost,
};
