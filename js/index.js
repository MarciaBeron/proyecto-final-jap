function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    const user = localStorage.getItem("user");
    if (!user) {
        window.location.href = "login.html";
    }
    var logoutButton = document.getElementById("cerrar");
      if (!localStorage.getItem("user")) {
        logoutButton.style.display = "none";
      } else {
        logoutButton.style.display = "inline"; // or "block", depending on your layout
      }
});