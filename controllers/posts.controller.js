const Post = require("../models/Post");
const User = require("../models/User");

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    const newPost = new Post({
      user: req.userId,
      name: user.name,
      content: req.body.content,
    });

    const post = await newPost.save();

    return res.status(201).json({ msg: "New post created", post });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMsg = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        error: errMsg,
      });
    } else {
      console.log(err);
      return res.status(500).json({
        error: "Server error",
      });
    }
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Server error",
    });
  }
};

// @desc    Get user's all posts by user ID
// @route   GET /api/posts/user/:userId
// @access  Public
exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(posts);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid user ID" });
    } else {
      console.log(err);
      return res.status(500).json({
        error: "Server error",
      });
    }
  }
};

// @desc    Get post by post ID
// @route   GET /api/posts/:postId
// @access  Public
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid post ID" });
    } else {
      console.log(err);
      return res.status(500).json({
        error: "Server error",
      });
    }
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:postId
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Only allow user to delete own post
    if (post.user.toString() !== req.userId) {
      return res.status(401).json({ error: "Authorization denied" });
    }

    await post.remove();

    return res.status(200).json({ msg: "Post deleted" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid post ID" });
    } else {
      console.log(err);
      return res.status(500).json({
        error: "Server error",
      });
    }
  }
};

// @desc    Like post
// @route   POST /api/posts/:postId/like
// @access  Private
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user has already liked post
    if (post.likes.some((like) => like.user.toString() === req.userId)) {
      return res.status(400).json({ error: "User has already liked the post" });
    }

    post.likes.unshift({ user: req.userId });

    await post.save();

    return res.status(200).json({ msg: "Liked post", likes: post.likes });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid post ID" });
    } else {
      console.log(err);
      return res.status(500).json({
        error: "Server error",
      });
    }
  }
};

// @desc    Unlike post
// @route   DELETE /api/posts/:postId/like
// @access  Private
exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user has already liked post
    if (!post.likes.some((like) => like.user.toString() === req.userId)) {
      return res.status(400).json({ error: "User has not liked the post yet" });
    }

    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.userId
    );

    await post.save();

    return res
      .status(200)
      .json({ msg: "Remove like from post", likes: post.likes });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid post ID" });
    } else {
      console.log(err);
      return res.status(500).json({
        error: "Server error",
      });
    }
  }
};

// @desc    Comment post
// @route   POST /api/posts/:postId/comment
// @access  Private
exports.commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const user = await User.findById(req.userId).select("-password");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = {
      user: user.id,
      content: req.body.content,
      name: user.name,
    };

    post.comments.unshift(newComment);

    await post.save();

    return res.status(201).json({ comments: post.comments });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errMsg = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        error: errMsg,
      });
    } else if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid post ID" });
    } else {
      console.log(err);
      return res.status(500).json({
        error: "Server error",
      });
    }
  }
};

// @desc    Delete post comment
// @route   DELETE /api/posts/:postId/comment/:commentId
// @access  Private
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = post.comments.find(
      (comment) => comment.id === req.params.commentId
    );

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Only allow user to delete own comment
    if (comment.user.toString() !== req.userId) {
      return res.status(401).json({ error: "Authorization denied" });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.commentId
    );

    await post.save();

    return res.status(200).json({ msg: "Comment deleted" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid post ID" });
    } else {
      console.log(err);
      return res.status(500).json({
        error: "Server error",
      });
    }
  }
};
