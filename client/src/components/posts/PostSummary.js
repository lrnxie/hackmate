import React from "react";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: theme.spacing(2),
  },
  action: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 2),
  },
}));

const PostSummary = ({ post, currentUser }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={2}>
      <CardActionArea>
        <CardHeader
          avatar={
            <IconButton
              size="small"
              component={RouterLink}
              to={`/profile/${post.user}`}
            >
              <Avatar>{post.name[0]}</Avatar>
            </IconButton>
          }
          title={post.name}
          subheader={moment(post.createdAt).format("MMM DD")}
        />

        <CardContent>
          <Typography>{post.content}</Typography>
        </CardContent>

        <CardActions>
          <div className={classes.action}>
            <Checkbox
              icon={<FavoriteBorderIcon />}
              checkedIcon={<FavoriteIcon />}
              disabled={currentUser === null}
            />
            <Typography variant="body2">{post.likes.length}</Typography>
          </div>

          <div className={classes.action}>
            <IconButton>
              <CommentIcon />
            </IconButton>
            <Typography variant="body2">{post.comments.length}</Typography>
          </div>

          {currentUser && currentUser._id === post.user && (
            <div className={classes.action}>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default PostSummary;
