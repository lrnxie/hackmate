import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

import { getAllPosts } from "../../actions/post";
import PostSummary from "./PostSummary";
import NewPost from "./NewPost";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  title: {
    width: 650,
  },
}));

const PostList = ({ posts, postLoading, user, authLoading, getAllPosts }) => {
  const classes = useStyles();

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12} className={classes.title}>
          <Typography variant="h6">Posts</Typography>
        </Grid>

        {!authLoading && user && <NewPost />}

        {postLoading || authLoading ? (
          <CircularProgress />
        ) : posts ? (
          posts.map((post) => (
            <PostSummary key={post._id} post={post} currentUser={user} />
          ))
        ) : (
          <Typography>No posts yet</Typography>
        )}
      </Grid>
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
