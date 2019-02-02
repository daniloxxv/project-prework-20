

$(document).ready(function() {
  var SideComments = require("side-comments");
  window.sideComments = new SideComments(
    "#commentable-container",
    currentUsera,
    existingComments
  );
  window.sideComments.on("commentPosted", function(comment) {
    comment.id = parseInt(Math.random() * (100000 - 1) + 1);
  });

  // Listen to "commentPosted", and send a request to your backend to save the comment.
  // More about this event in the "docs" section.
  sideComments.on("commentPosted", function(comment) {
    $.ajax({
      url: "/comments",
      type: "POST",
      data: comment,
      success: function(savedComment) {
        // Once the comment is saved, you can insert the comment into the comment stream with "insertComment(comment)".
        alert("Comment saved");
        sideComments.insertComment(comment);
      }
    });
  });

  // Listen to "commentDeleted" and send a request to your backend to delete the comment.
  // More about this event in the "docs" section.
  sideComments.on("commentDeleted", function(commentId) {
    $.ajax({
      url: "/delete",
      type: "POST",
      data: commentId,
      success: function(success) {
        //sideComments.removeComment(commentId.sectionId, commentId.id);
        window.location.assign("/");
      }
    });
  });
});
