function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function() {
    //RECIBIR NOTICIAS
    const newsletterPrompt = document.getElementById("newsletterPrompt");
    const yesButton = document.getElementById("yes");
    const noButton = document.getElementById("no");
    const popupForm = document.getElementById("popupForm");
  
    if (!sessionStorage.getItem("newsletterDecision")) {
        setTimeout(function(){
            newsletterPrompt.classList.remove("hidden");
            newsletterPrompt.classList.add("show");
        }, 100);
    }
  
    yesButton.addEventListener("click", function() {
        console.log("El usuario quiere recibir novedades.");
        sessionStorage.setItem("newsletterDecision", "yes");
        newsletterPrompt.classList.add("hidden");
        popupForm.classList.remove("hidden");
    });
  
    noButton.addEventListener("click", function() {
        console.log("El usuario no quiere recibir novedades.");
        sessionStorage.setItem("newsletterDecision", "no");
        newsletterPrompt.classList.add("hidden");
    });
  
    popupForm.addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Formulario enviado");
        popupForm.classList.add("hidden");
    });

  // MOSTRAR CATEGORIAS INICIO
  document.getElementById("autos").addEventListener("click", function() {
    localStorage.setItem("catID", 101);
    window.location.href = "products.html"
});
document.getElementById("juguetes").addEventListener("click", function() {
    localStorage.setItem("catID", 102);
    window.location = "products.html"
});
document.getElementById("muebles").addEventListener("click", function() {
    localStorage.setItem("catID", 103);
    window.location = "products.html"
});
})