import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteUser } from "../../actions/auth";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  button: {
    width: 300,
    marginTop: theme.spacing(5),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    position: "absolute",
    top: "25%",
    margin: "auto",
    width: 400,
    textAlign: "center",
    outline: "none",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(4),
  },
}));

const DeleteUser = ({ user, deleteUser }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        className={classes.button}
        variant="outlined"
        color="secondary"
      >
        Delete account
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className={classes.body}>
          <Typography variant="h6">
            Are you sure to delete your account?
          </Typography>
          <Button
            onClick={() => deleteUser(user._id)}
            className={classes.button}
            variant="outlined"
            color="secondary"
          >
            Yes, delete my account
          </Button>
          <Button
            onClick={() => setOpen(false)}
            className={classes.button}
            variant="outlined"
            color="primary"
          >
            No, go back
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { deleteUser })(DeleteUser);
