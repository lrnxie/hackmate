import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import { deleteUser } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
  button: {
    width: 300,
    marginTop: theme.spacing(5),
  },
}));

const DeleteUser = ({ user, deleteUser }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
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

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete your account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting account will also delete your profile. You will no longer
            have access to this account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Disagree
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { deleteUser })(DeleteUser);
