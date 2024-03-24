const express = require("express");

const router = express.Router();

const postController = require("../controllers/postControllers");

router.route("/").get(postController.getAllPost);

module.exports = router;
