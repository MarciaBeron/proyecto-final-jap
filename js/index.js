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

document.addEventListener("DOMContentLoaded", function(){
    var newsletterPrompt = document.getElementById("newsletterPrompt");
    var yesButton = document.getElementById("yes");
    var noButton = document.getElementById ("no");

    setTimeout(function(){
        newsletterPrompt.classList.add("show");
    }, 100);

    yesButton.addEventListener("click", function() {
        console.log("El usuario quiere recibir novedades.");
        newsletterPrompt.classList.remove("show");
    });

    noButton.addEventListener("click", function() {
        console.log("El usuario no quiere recibir novedades.");
        newsletterPrompt.classList.remove("show");
    });
});

 document.addEventListener("DOMContentLoaded", function(){
    var newsletterPrompt = document.getElementById("newsletterPrompt");
    var yesButton = document.getElementById("yes");
    var noButton = document.getElementById("no");
    var popupForm = document.getElementById("popupForm");

    setTimeout(function(){
        newsletterPrompt.classList.remove("hidden");
        newsletterPrompt.classList.add("show"); 
    }, 100);

    yesButton.addEventListener("click", function() {
        console.log("El usuario quiere recibir novedades.");
        newsletterPrompt.classList.add("hidden");
        popupForm.classList.remove("hidden");
    });

    noButton.addEventListener("click", function() {
        console.log("El usuario no quiere recibir novedades.");
        newsletterPrompt.classList.add("hidden");
    });
});