$(document).ready(function() {
  $("#input-b2").fileinput({ showUpload: false });


  $("#btn-submit").click(function() {
    $.blockUI({
      message: '<img src="/images/1.gif" />',
      css: {
        border: "none",
        backgroundColor: "transparent"
      }
    });
  
  });
});
