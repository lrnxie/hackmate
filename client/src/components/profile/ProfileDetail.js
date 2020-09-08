import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/Edit";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: "auto",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  info: {
    margin: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(2),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  withIcon: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      marginRight: theme.spacing(0.5),
    },
  },
  spacing: {
    margin: theme.spacing(2),
  },
  skill: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const ProfileDetail = ({ profile, isCurrentUser }) => {
  const classes = useStyles();
  const { user, headline, location, bio, skills } = profile;

  const nameInitials = (name) => {
    const split = name.split(" ");
    return split.length === 2 ? split[0][0] + split[1][0] : split[0][0];
  };

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className={classes.info}>
          <Avatar className={classes.avatar}>
            <Typography variant="h4">{nameInitials(user.name)}</Typography>
          </Avatar>
          <div>
            <Typography variant="h5">{user.name}</Typography>
            {headline && (
              <Typography variant="body2" className={classes.withIcon}>
                <WorkOutlineOutlinedIcon fontSize="small" />
                {headline}
              </Typography>
            )}
            {location && (
              <Typography variant="body2" className={classes.withIcon}>
                <LocationOnOutlinedIcon fontSize="small" />
                {location}
              </Typography>
            )}
          </div>
        </div>
        {isCurrentUser && (
          <IconButton
            component={RouterLink}
            to="/profile/edit"
            className={classes.spacing}
            variant="contained"
            color="primary"
          >
            <EditIcon />
          </IconButton>
        )}
      </div>
      <div className={classes.spacing}>
        {bio && <Typography>{bio}</Typography>}
      </div>
      {skills && skills.length > 0 && (
        <div className={classes.spacing}>
          <div className={classes.skill}>
            {skills.map((skill, index) => (
              <Chip key={index} label={skill} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;
