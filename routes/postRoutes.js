const passport = require("passport");
const { Router } = require("express");
const router = Router();
const User = require("../Model/User");
//Section  Model
const Section = require("../Model/Section");

router.get("/learning", (req, res, next) => {
  const user = req.user;
  
  if (user) {
    var commentas = [];
    Section.find()
      .then(comments => {
        commentas = comments;
        //Foreach to pass the id of each section as string
        commentas.forEach(element => {
          element._id = element._id.toString();       
        });
        const data = {
          user: user,
          coment: commentas
        };
        //console.log("The data is:", data);
        res.render("learning", { data });
      })

     // User.findOne({
      //email: user.email
   // })
     // .then(user => {
       
   //   })
   //   .catch(err => {
     //   console.log(err);
      //});
  }else{

    res.render("auth/login")
  }
});

// @route   POST /comments
// @desc    Insert a new comment on existing section or creates a new Section with comment
// @access  Private
router.post("/comments", (req, res, next) => {
  //Get the request body
  const {
    authorAvatarUrl,
    authorId,
    authorName,
    authorUrl,
    comment,
    sectionId,
    id
  } = req.body;

  const data = {
    authorAvatarUrl,
    authorId,
    authorName,
    authorUrl,
    comment,
    sectionId,
    id
  };

  //Here we create the new Comment object with the data of req.body
  const newComment = {
    authorAvatarUrl,
    authorName,
    authorId,
    authorUrl,
    comment,
    id,
    deleted: false,
    replies: []
  };

  //Query
  const query = {
      sectionId: sectionId
    },
    update = {
      $push: {
        comments: newComment
      }
    },
    options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    };

  //if the document is not found, then create a new one, else update comments and push the newComment
  Section.findOneAndUpdate(query, update, options)
    .then(comment => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
});

// @route   POST /delete
// @desc    Marks the recievied comment id as deleted
// @access  Private
router.post("/delete", (req, res, next) => {
  const commentId = req.body.id;
  Section.update(
    { "comments.id": commentId },
    { $set: { "comments.$.deleted": true } }
  )
    .then(comment => {
      console.log(comment);
      res.redirect(200, "/learning");
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
