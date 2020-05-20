import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProfile, updateProfile } from "../../actions/profile";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: "auto",
  },
  title: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(1),
  },
  flex: {
    display: "flex",
    flexWrap: "wrap",
  },
  fieldName: {
    width: 100,
  },
  textField: {
    width: 550,
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  button: {
    width: 100,
    margin: theme.spacing(3),
  },
}));

const UpdateProfile = ({
  user,
  authLoading,
  profile,
  profileLoading,
  getProfile,
  updateProfile,
  history,
}) => {
  const classes = useStyles();
  const initialState = {
    headline: "",
    location: "",
    bio: "",
    skills: "",
  };
  const [formData, setFormData] = useState(initialState);
  const { headline, location, bio, skills } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData, user._id, history);
  };

  useEffect(() => {
    if (user) getProfile(user._id);
    if (!profileLoading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(", ");
      setFormData(profileData);
    }
  }, []);

  return (
    !authLoading && (
      <div className={classes.root}>
        <Typography className={classes.title} variant="h5">
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <List>
            <ListItem className={classes.flex}>
              <ListItemText primary="Headline" className={classes.fieldName} />
              <TextField
                className={classes.textField}
                variant="outlined"
                placeholder="Software Engineer, Student..."
                name="headline"
                value={headline}
                onChange={handleChange}
              />
            </ListItem>

            <ListItem className={classes.flex}>
              <ListItemText primary="Location" className={classes.fieldName} />
              <TextField
                className={classes.textField}
                variant="outlined"
                placeholder="Toronto, ON"
                name="location"
                value={location}
                onChange={handleChange}
              />
            </ListItem>

            <ListItem className={classes.flex}>
              <ListItemText primary="Bio" className={classes.fieldName} />
              <TextField
                className={classes.textField}
                variant="outlined"
                multiline
                rows={3}
                placeholder="Introduce yourself..."
                name="bio"
                value={bio}
                onChange={handleChange}
              />
            </ListItem>

            <ListItem className={classes.flex}>
              <ListItemText primary="Skills" className={classes.fieldName} />
              <TextField
                className={classes.textField}
                variant="outlined"
                placeholder="HTML, CSS, JavaScript, Python..."
                helperText="Sperate by comma"
                name="skills"
                value={skills}
                onChange={handleChange}
              />
            </ListItem>
          </List>

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
          >
            Save
          </Button>
        </form>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  authLoading: state.auth.loading,
  profile: state.profile.profile,
  profileLoading: state.profile.loading,
});

export default connect(mapStateToProps, { getProfile, updateProfile })(
  UpdateProfile
);
