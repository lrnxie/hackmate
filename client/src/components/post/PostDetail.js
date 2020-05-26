import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPost, clearPost } from "../../actions/post";
import PostContent from "./PostContent";
import Comment from "./Comment";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: (theme.spacing(2), "auto"),
  },
  card: {
    maxWidth: 600,
    margin: theme.spacing(2),
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

  return authLoading || post === null ? (
    <CircularProgress />
  ) : (
    <div className={classes.root}>
      <PostContent post={post} currentUser={currentUser} history={history} />

      <Card className={classes.card} variant="outlined">
        <CardHeader
          title={<Typography>{post.comments.length} comments</Typography>}
        />
        {post.comments &&
          post.comments.map((comment) => (
            <Comment
              key={comment._id}
              currentUser={currentUser}
              comment={comment}
            />
          ))}
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post.post,
  currentUser: state.auth.user,
  authLoading: state.auth.loading,
});

export default connect(mapStateToProps, { clearPost, getPost })(PostDetail);
