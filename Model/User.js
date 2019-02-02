//User Model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  id:Number,
  username: String,
  email:  String,
  avatarUrl:String,
  password: String,
 
},
  {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

userSchema.plugin(passportLocalMongoose, {usernameField: "username"});

const User = mongoose.model("User", userSchema);
module.exports = User;