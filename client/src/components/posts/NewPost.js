import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { addPost } from "../../actions/post";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 650,
    margin: "auto",
  },
  form: {
    margin: theme.spacing(1),
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
    <Grid item xs={12} className={classes.root}>
      <div className={classes.form}>
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
    </Grid>
  );
};

export default connect(null, { addPost })(NewPost);
