import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getUserPosts } from "../../actions/post";
import PostSummary from "../posts/PostSummary";

const useStyles = makeStyles((theme) => ({
  spacing: {
    margin: theme.spacing(3, 2),
  },
  loading: {
    display: "flex",
    justifyContent: "center",
  },
}));

const UserPosts = ({
  userId,
  posts,
  postLoading,
  currentUser,
  authLoading,
  getUserPosts,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getUserPosts(userId);
  }, [userId]);

  return (
    <>
      <Divider />
      {postLoading || authLoading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : posts ? (
        <div className={classes.spacing}>
          {posts.map((post) => (
            <PostSummary key={post._id} post={post} currentUser={currentUser} />
          ))}
        </div>
      ) : (
        <Typography>No posts yet</Typography>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  postLoading: state.post.loading,
  currentUser: state.auth.user,
  authLoading: state.auth.loading,
});

export default connect(mapStateToProps, { getUserPosts })(UserPosts);
