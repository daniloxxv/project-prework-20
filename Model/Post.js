//Post model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  text: {
    type: String
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [{

    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    text: {
      type: String
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
  }],
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;