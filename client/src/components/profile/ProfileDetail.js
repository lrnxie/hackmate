import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: "auto",
    marginTop: theme.spacing(5),
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
  spacing: {
    margin: theme.spacing(2),
  },
  skill: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const ProfileDetail = ({ profile }) => {
  const classes = useStyles();
  const { user, headline, location, bio, skills } = profile;

  const nameInitials = (name) => {
    const split = name.split(" ");
    return split.length === 2 ? split[0][0] + split[1][0] : split[0][0];
  };

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <Avatar className={classes.avatar}>
          <Typography variant="h4">{nameInitials(user.name)}</Typography>
        </Avatar>
        <div>
          <Typography variant="h5">{user.name}</Typography>
          {headline && <Typography variant="body2">{headline}</Typography>}
          {location && <Typography variant="body2">{location}</Typography>}
        </div>
      </div>
      <div className={classes.spacing}>
        {bio && <Typography>{bio}</Typography>}
      </div>
      {skills && skills.length > 0 && (
        <div>
          <Divider />
          <div className={classes.spacing}>
            <Typography variant="h6">Skills</Typography>
            <div className={classes.skill}>
              {skills.map((skill, index) => (
                <Chip key={index} label={skill} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;
