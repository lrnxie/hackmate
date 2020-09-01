import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getProfile, clearProfile } from "../../actions/profile";
import ProfileDetail from "./ProfileDetail";
import UserPosts from "./UserPosts";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 800,
    margin: "auto",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
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

  const isCurrentUser = user && user._id === match.params.id;

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
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <ProfileDetail profile={profile} isCurrentUser={isCurrentUser} />
      )}
      <UserPosts userId={match.params.id} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profile.profile,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getProfile, clearProfile })(Profile);
