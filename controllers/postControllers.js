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

const getDataById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({
      where: { id: id },
    });

    res.status(200).json({
      status: "Success",
      requestAt: req.requestTime,
      data: { post },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const updateData = async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = req.body;

    const post = await Post.findOne({
      where: { id: id },
    });

    if (!post) {
      return res.status(400).json({
        status: "Failed",
        message: `Data with id (${id}) not exist`,
      });
    }

    const query = {
      where: { id: id },
    };

    await Post.update(data, query)
      .then(() => {
        res.status(200).json({
          status: "Success",
          message: "Data successfully updated",
        });
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const deleteData = async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findOne({ where: { id: id } });
  if (!post) {
    return res.status(400).json({
      status: "Failed",
      message: `Data with ID (${id}) is not exist`,
    });
  }

  await Post.destroy({
    where: { id: id },
  })
    .then(() => {
      res.status(204).json({
        status: "Success",
        message: "Data successfully deleted",
      });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

module.exports = {
  getAllPost,
  createPost,
  getDataById,
  updateData,
  deleteData,
};
