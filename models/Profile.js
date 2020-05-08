const mongoose = require("mongoose");

const linkValidation = (val) => (val ? true : false);

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  headline: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  skills: {
    type: [String],
  },
  links: [
    {
      name: {
        type: String,
        validate: [linkValidation, "Please enter a name"],
      },
      url: {
        type: String,
        validate: [linkValidation, "Please enter a url"],
      },
    },
  ],
});

module.exports = mongoose.model("Profile", ProfileSchema);
