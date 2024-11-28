function validateForm() {
  var email = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (email === "" || password === "") {
    alert("Por favor, complete ambos campos.");
    return false;
  } 
  // Realizar la solicitud de login al backend
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: email, password: password }) // Enviar email y password
  })
  .then(response => response.json()) // Convertir la respuesta a JSON
  .then(data => {
    if (data.token) {
      // Si la respuesta contiene un token, guardarlo en localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", email); // Si también quieres guardar el email
      alert("Inicio de sesión exitoso.");
      
      // Redirigir a la página de categorías o la página que desees
      window.location.href = "index.html"; // O donde necesites redirigir

    } else {
      // Si no hay token, mostrar mensaje de error
      alert("Usuario o contraseña incorrectos.");
    }
  })
  .catch(error => {
    // Manejar errores en la solicitud
    console.error("Error al hacer login:", error);
    alert("Hubo un error en el inicio de sesión. Intenta nuevamente.");
  });

  return false; // Evitar el envío normal del formulario
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
