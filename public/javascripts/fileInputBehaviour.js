$(document).ready(function() {
  $("#input-b2").fileinput({
    showUpload: false,
    allowedFileExtensions: ["jpg", "png", "gif"]
  });

  $("#btn-submit").click(function() {
  
    var fileInput = $(".file-caption-name");

    debugger;
    var title = fileInput.attr("title");

    if (title === "Validation Error" || title === undefined) {
      return;
    } else {
      $.blockUI({
        message: '<img src="/images/1.gif" />',
        css: {
          border: "none",
          backgroundColor: "transparent"
        }
      });
    }
  });
});
