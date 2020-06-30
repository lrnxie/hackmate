import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { addComment } from "../../actions/post";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: theme.spacing(1, 2),
  },
  button: {
    margin: theme.spacing(2, 0),
  },
}));

const NewComment = ({ postId, addComment }) => {
  const classes = useStyles();

  const [content, setContent] = useState("");

  const handleChange = (e) => setContent(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      addComment(postId, { content: content.trim() });
      setContent("");
    }
  };

  return (
    <div className={classes.root}>
      <TextField
        placeholder="Add a new comment..."
        fullWidth
        multiline
        value={content}
        onChange={handleChange}
      />
      <Button
        className={classes.button}
        size="small"
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Comment
      </Button>
    </div>
  );
};

export default connect(null, { addComment })(NewComment);
