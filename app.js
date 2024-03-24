const express = require("express");

const app = express();

const postController = require("./routes/postRoutes");

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/posts", postController);

module.exports = app;
