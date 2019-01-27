//Profile model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  location: {
    type: String
  },
  skills: {
    type: Array
  },
  bio: {
    type: String
  },
  githubUsername: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;