import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";

import { getPost, clearPost } from "../../actions/post";
import PostContent from "./PostContent";
import NewComment from "./NewComment";
import Comment from "./Comment";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  comments: {
    width: 650,
    marginTop: theme.spacing(1),
  },
}));

const PostDetail = ({
  post,
  currentUser,
  authLoading,
  clearPost,
  getPost,
  match,
  history,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getPost(match.params.id);

    return () => clearPost();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center">
        {authLoading || post === null ? (
          <CircularProgress />
        ) : (
          <>
            <PostContent
              post={post}
              currentUser={currentUser}
              history={history}
            />

            <Grid item xs={12} className={classes.comments}>
              <Card variant="outlined">
                <CardHeader
                  title={
                    <Typography>{post.comments.length} comments</Typography>
                  }
                />

                {currentUser !== null && <NewComment postId={post._id} />}

                {post.comments &&
                  post.comments.map((comment) => (
                    <Comment
                      key={comment._id}
                      currentUser={currentUser}
                      comment={comment}
                      postId={post._id}
                    />
                  ))}
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post.post,
  currentUser: state.auth.user,
  authLoading: state.auth.loading,
});

export default connect(mapStateToProps, { clearPost, getPost })(PostDetail);
