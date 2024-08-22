
function validateForm() {
  var email = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (email === "" || password === "") {
    alert("Por favor, complete ambos campos.");
    return false;
  } else {
    localStorage.setItem("user", email);
    window.location.href = "index.html";
    return false;
  }

}

document.addEventListener("DOMContentLoaded", function(){

})