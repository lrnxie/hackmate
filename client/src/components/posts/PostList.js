import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllPosts } from "../../actions/post";
import PostSummary from "./PostSummary";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

const PostList = ({ posts, postLoading, user, authLoading, getAllPosts }) => {
  const classes = useStyles();

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h6">Posts</Typography>
      {postLoading || authLoading ? (
        <CircularProgress />
      ) : posts ? (
        posts.map((post) => (
          <PostSummary key={post._id} post={post} currentUser={user} />
        ))
      ) : (
        <Typography>No posts yet</Typography>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  postLoading: state.post.loading,
  user: state.auth.user,
  authLoading: state.auth.loading,
});

export default connect(mapStateToProps, { getAllPosts })(PostList);
