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

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Para revenir el envío por defecto
  validateForm();  // Llama a la función que valida el formulario y guarda el email
  const popup = document.getElementById("loginSuccessPopup");
  popup.style.display = "flex";
  
  setTimeout(function() {
      popup.style.display = "none";
  }, 3000); 

  document.getElementById("closePopupButton").addEventListener("click", function() {
      popup.style.display = "none";
  });
});
