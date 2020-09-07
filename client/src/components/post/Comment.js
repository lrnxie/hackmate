import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonIcon from "@material-ui/icons/Person";

import { deleteComment } from "../../actions/post";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    margin: theme.spacing(1),
    border: 0,
  },
  title: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
  },
  margin: {
    marginLeft: theme.spacing(1),
  },
}));

const Comment = ({
  currentUser,
  comment: { _id, user, content, createdAt },
  postId,
  deleteComment,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          user ? (
            <Avatar
              component={RouterLink}
              to={`/profile/${user._id}`}
              className={classes.link}
            >
              {user.name[0]}
            </Avatar>
          ) : (
            <Avatar>
              <PersonIcon />
            </Avatar>
          )
        }
        title={
          <div className={classes.title}>
            {user ? (
              <Typography
                component={RouterLink}
                to={`/profile/${user._id}`}
                className={classes.link}
                variant="body2"
                color="textPrimary"
              >
                {user.name}
              </Typography>
            ) : (
              <Typography variant="body2">[UserDeleted]</Typography>
            )}
            <Typography
              className={classes.margin}
              variant="caption"
              color="textSecondary"
            >
              {moment(createdAt).fromNow("")}
            </Typography>
            {currentUser && user && currentUser._id === user._id && (
              <IconButton
                className={classes.margin}
                size="small"
                onClick={() => {
                  deleteComment(postId, _id);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </div>
        }
        subheader={<Typography variant="body2">{content}</Typography>}
      />
    </Card>
  );
};

export default connect(null, { deleteComment })(Comment);
