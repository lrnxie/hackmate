import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import DeleteIcon from "@material-ui/icons/Delete";

import { addLike, removeLike, deletePost } from "../../actions/post";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 650,
    margin: "auto",
  },
  card: {
    margin: theme.spacing(1),
  },
  noUnderline: {
    textDecoration: "none",
  },
  action: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 2),
  },
}));

const PostSummary = ({
  post,
  currentUser,
  addLike,
  removeLike,
  deletePost,
}) => {
  const classes = useStyles();

  const [liked, setLiked] = useState(
    currentUser && post.likes.some((like) => like.user === currentUser._id)
  );

  const handleChange = (e) => {
    setLiked(e.target.checked);
    if (e.target.checked) {
      addLike(post._id);
    } else {
      removeLike(post._id);
    }
  };

  useEffect(() => {
    setLiked(
      currentUser && post.likes.some((like) => like.user === currentUser._id)
    );
  }, [currentUser]);

  return (
    <Grid item xs={12} className={classes.root}>
      <Card className={classes.card} variant="outlined">
        <CardHeader
          avatar={
            <Avatar
              component={RouterLink}
              to={`/profile/${post.user}`}
              className={classes.noUnderline}
            >
              {post.name[0]}
            </Avatar>
          }
          title={
            <Typography
              component={RouterLink}
              to={`/profile/${post.user}`}
              className={classes.noUnderline}
              variant="body2"
              color="inherit"
            >
              {post.name}
            </Typography>
          }
          subheader={moment(post.createdAt).format("MMM DD")}
        />

        <CardContent>
          <Typography>{post.content}</Typography>
        </CardContent>

        <CardActions>
          <div className={classes.action}>
            <Checkbox
              checked={liked}
              icon={<FavoriteIcon />}
              checkedIcon={<FavoriteIcon />}
              disabled={currentUser === null}
              onChange={handleChange}
            />
            <Typography variant="body2">{post.likes.length}</Typography>
          </div>

          <div className={classes.action}>
            <IconButton component={RouterLink} to={`/post/${post._id}`}>
              <CommentIcon />
            </IconButton>
            <Typography variant="body2">{post.comments.length}</Typography>
          </div>

          {currentUser && currentUser._id === post.user && (
            <div className={classes.action}>
              <IconButton
                onClick={() => {
                  deletePost(post._id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default connect(null, { addLike, removeLike, deletePost })(PostSummary);
