import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteUser } from "../../actions/auth";
import { deleteProfile } from "../../actions/profile";

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
  modalBody: {
    position: "absolute",
    top: "25%",
    maxWidth: 430,
    textAlign: "center",
    borderRadius: 5,
    outline: "none",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(4),
  },
  modalBtn: {
    width: 250,
    marginTop: theme.spacing(3),
  },
}));

const DeleteUser = ({ user, deleteUser, deleteProfile }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deleteProfile(user._id);
    deleteUser(user._id);
  };

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
        <div className={classes.modalBody}>
          <Typography variant="h6">
            Are you sure you want to delete your account?
          </Typography>
          <Typography variant="caption">
            Deleting account will also delete your profile
          </Typography>
          <Button
            onClick={handleDelete}
            className={classes.modalBtn}
            variant="outlined"
            color="secondary"
          >
            Yes, delete my account
          </Button>
          <Button
            onClick={() => setOpen(false)}
            className={classes.modalBtn}
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

export default connect(mapStateToProps, { deleteUser, deleteProfile })(
  DeleteUser
);
