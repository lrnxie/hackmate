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
import DeleteIcon from "@material-ui/icons/Delete";
import PersonIcon from "@material-ui/icons/Person";

import { deletePost, addLike, removeLike } from "../../actions/post";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 650,
    margin: "auto",
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

const PostContent = ({
  post,
  currentUser,
  deletePost,
  addLike,
  removeLike,
  history,
}) => {
  const classes = useStyles();

  const [liked, setLiked] = useState(
    currentUser &&
      post.likes.some((like) => like.user && like.user._id === currentUser._id)
  );

  const handleChange = (e) => {
    setLiked(e.target.checked);
    if (e.target.checked) {
      addLike(post._id);
    } else {
      removeLike(post._id);
    }
  };

  const handleDelete = () => {
    deletePost(post._id);
    history.push("/");
  };

  useEffect(() => {
    setLiked(
      currentUser &&
        post.likes.some(
          (like) => like.user && like.user._id === currentUser._id
        )
    );
  }, [currentUser]);

  return (
    <Grid item xs={12} className={classes.root}>
      <Card variant="outlined">
        <CardHeader
          avatar={
            post.user ? (
              <Avatar
                component={RouterLink}
                to={`/profile/${post.user._id}`}
                className={classes.noUnderline}
              >
                {post.user.name[0]}
              </Avatar>
            ) : (
              <Avatar>
                <PersonIcon />
              </Avatar>
            )
          }
          title={
            post.user ? (
              <Typography
                component={RouterLink}
                to={`/profile/${post.user._id}`}
                className={classes.noUnderline}
                variant="body2"
                color="inherit"
              >
                {post.user.name}
              </Typography>
            ) : (
              <Typography variant="body2">[UserDeleted]</Typography>
            )
          }
          subheader={moment(post.createdAt).format("MMMM Do YYYY, h:mm a")}
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

          {currentUser && post.user && currentUser._id === post.user._id && (
            <div className={classes.action}>
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default connect(null, { deletePost, addLike, removeLike })(PostContent);
