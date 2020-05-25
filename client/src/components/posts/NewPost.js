import React, { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(2, 1),
  },
}));

const NewPost = ({ addPost }) => {
  const classes = useStyles();

  const [content, setContent] = useState("");

  const handleChange = (e) => setContent(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      addPost({ content: content.trim() });
      setContent("");
    }
  };

  return (
    <div className={classes.root}>
      <TextField
        placeholder="Say something..."
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        value={content}
        onChange={handleChange}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Post
      </Button>
    </div>
  );
};

export default connect(null, { addPost })(NewPost);
