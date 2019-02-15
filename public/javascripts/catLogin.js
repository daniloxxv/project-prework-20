$(document).ready(function() {
  if (localStorage.getItem("visit") == null) {
    // Show Welcome message

    Swal.fire({
      type: "success",
      title: "Logged in successfully",
      width: 300,
      padding: "3em",
      background: "#fff",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  localStorage.setItem("visit", new Date());
});
