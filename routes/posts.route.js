const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createPost,
  getAllPosts,
  getPostsByUser,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  deleteComment,
} = require("../controllers/posts.controller");

router.route("/").post(auth, createPost).get(getAllPosts);

router.route("/:userId").get(getPostsByUser);

router.route("/:postId").get(getPostById).delete(auth, deletePost);

router.route("/:postId/like").post(auth, likePost).delete(auth, unlikePost);

router.route("/:postId/comment").post(auth, commentPost);

router.route("/:postId/comment/:commentId").delete(auth, deleteComment);

module.exports = router;
