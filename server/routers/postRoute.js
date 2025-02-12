const express = require("express");
const postController = require("../controllers/postController");
const postRouter = express.Router();

postRouter.get("/", postController.getPosts);
postRouter.get("/:authorId", postController.getPostsByAuthor);
postRouter.post("/add", postController.addPost);
postRouter.post("/comment", postController.commentPost);
postRouter.put("/edit/:id", postController.editPost);
postRouter.delete("/delete/:id", postController.deletePost);

module.exports = postRouter;
