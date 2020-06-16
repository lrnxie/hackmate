import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { getProfile, clearProfile } from "../../actions/profile";
import ProfileDetail from "./ProfileDetail";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: "auto",
    marginTop: theme.spacing(5),
  },
  spacing: {
    margin: theme.spacing(2),
  },
}));

const Profile = ({
  user,
  profile,
  loading,
  getProfile,
  clearProfile,
  match,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getProfile(match.params.id);
  }, [getProfile, match.params.id]);

  useEffect(() => {
    return () => {
      clearProfile();
    };
  }, []);

  return (
    <div className={classes.root}>
      {loading ? (
        <CircularProgress />
      ) : profile === null ? (
        user && user._id === match.params.id ? (
          <div>
            <Typography>You have not created your profile yet</Typography>
            <Button
              component={RouterLink}
              to="/profile/edit"
              className={classes.spacing}
              variant="contained"
              color="primary"
            >
              Create now
            </Button>
          </div>
        ) : (
          <div>
            <Typography>User has not created a profile yet</Typography>
          </div>
        )
      ) : (
        <div>
          <ProfileDetail profile={profile} />
          {user && user._id === match.params.id && (
            <div>
              <Divider />
              <Button
                component={RouterLink}
                to="/profile/edit"
                className={classes.spacing}
                variant="contained"
                color="primary"
              >
                Edit Profile
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profile.profile,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getProfile, clearProfile })(Profile);
