const express = require("express");
const postController = require("../controllers/postController");
const postRouter = express.Router();

postRouter.get("/:id", postController.getPost);
postRouter.get("/author/:authorId", postController.getPostsByAuthor);
postRouter.get("/", postController.getPosts);
postRouter.post("/add", postController.addPost);
postRouter.post("/comment", postController.commentPost);
postRouter.put("/edit/:id", postController.editPost);
postRouter.delete("/delete/:id", postController.deletePost);

module.exports = postRouter;
