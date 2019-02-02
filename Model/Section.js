const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema(
  {
    _id: false,
    id: String, //not needed, mongoose will automatically add an "_id" property when you save
    authorAvatarUrl: String,
    authorName: String,
    authorId: String,
    authorUrl: String,
    comment: String,
    parentId: String,
  },
  {
    versionKey: false,
  },
);

const commentSchema = new Schema(
  {
    _id: false,
    id: String, //not needed, mongoose will automatically add an "_id" property when you save
    authorAvatarUrl: String,
    authorName: String,
    authorId: Number,
    authorUrl: String,
    comment: String,
    deleted: Boolean,
    replies: {
      type: [replySchema],
    },
  },
  {
    versionKey: false,
  },
);

//Section includes all other schemas
const sectionSchema = new Schema(
  {
    _id: false,
    sectionId: {
      type: String,
    },
    comments: {
      type: [commentSchema],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model("Section", sectionSchema);
