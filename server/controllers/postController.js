const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");

class PostController {
  async addPost(req, res) {
    try {
      const { text, authorId } = req.body;

      const user = await UserModel.findById(authorId);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const post = await PostModel.create({
        author: authorId,
        text,
        comments: [],
      });

      return res.status(201).json(post);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Server error" });
    }
  }

  async editPost(req, res) {
    try {
      const { id } = req.params;
      const { text } = req.body;

      if (!text || !id) {
        return res
          .status(400)
          .json({ message: "Post ID and text are required" });
      }

      const updatedPost = await PostModel.findByIdAndUpdate(
        id,
        { text },
        { new: true },
      );

      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const deletedPost = await PostModel.findByIdAndDelete(id);

      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Error deleting post", error: e.message });
    }
  }

  async getPosts(req, res) {
    try {
      const posts = await PostModel.find();
      res.status(200).json(posts);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching posts", error: error.message });
    }
  }

  async getPost(req, res) {
    try {
      const { id } = req.params;
      const post = await PostModel.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: "Error finding post", error: error.message });
    }
  }


  async getPostsByAuthor(req, res) {
    try {
      const { authorId } = req.params;

      if (!authorId) {
        return res.status(400).json({ message: "Author ID is required" });
      }

      const posts = await PostModel.find({ author: authorId });

      if (!posts || posts.length === 0) {
        return res
          .status(404)
          .json({ message: "No posts found for this author" });
      }

      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  async commentPost(req, res) {
    const { postId, author, text } = req.body;

    if (!postId || !author || !text) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const post = await PostModel.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      post.comments.push({ author, text });

      await post.save();

      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding comment", error });
    }
  }
}

module.exports = new PostController();
