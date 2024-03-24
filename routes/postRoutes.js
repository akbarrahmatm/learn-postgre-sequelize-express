const express = require("express");

const router = express.Router();

const postController = require("../controllers/postControllers");

router
  .route("/")
  .get(postController.getAllPost)
  .post(postController.createPost);

router
  .route("/:id")
  .get(postController.getDataById)
  .patch(postController.updateData);

module.exports = router;
