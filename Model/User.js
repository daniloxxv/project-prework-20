//User Model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
  id:Number,
  username: String,
  email:  String,
  avatarUrl:String,
  password: String,
  completedLessons: Array,
  quizAnswers: Array
},
  {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});


const User = mongoose.model("User", userSchema);
module.exports = User;