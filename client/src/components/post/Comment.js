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
  comment: { _id, user, name, content, createdAt },
  postId,
  deleteComment,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar
            component={RouterLink}
            to={`/profile/${user}`}
            className={classes.link}
          >
            {name[0]}
          </Avatar>
        }
        title={
          <div className={classes.title}>
            <Typography
              component={RouterLink}
              to={`/profile/${user}`}
              className={classes.link}
              variant="body2"
              color="textPrimary"
            >
              {name}
            </Typography>
            <Typography
              className={classes.margin}
              variant="caption"
              color="textSecondary"
            >
              {moment(createdAt).fromNow("")}
            </Typography>
            {currentUser && currentUser._id === user && (
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
