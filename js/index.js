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