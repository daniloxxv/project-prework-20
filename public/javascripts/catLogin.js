$(document).ready(function() {
  if (localStorage.getItem("visit") == null) {
    // Show Welcome message

    Swal.fire({
      type: "success",
      title: "Logged in successfully",
      width: 300,
      padding: "3em",
      background: "#fff url(/images/trees.png)",
      backdrop: `
    rgba(0,0,123,0.4)
    url("/images/nyan-cat.gif")
    center left
    no-repeat
  `,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  localStorage.setItem("visit", new Date());
});
