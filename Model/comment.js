//This model is for side-comments optional implementation

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  sectionId: {
    type: String
  },
  comment: {
    type: String
  },
  authorAvatarUrl: {
    type: String
  },
  authorName: {
    type: String
  },
  authorId: {
    type: String
  },
  authorUrl: {
    type: String
  },
  id: {
    type: String
  }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;