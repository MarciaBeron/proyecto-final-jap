// Obtener referencias al formulario y al modal
const passwordResetForm = document.getElementById('passwordResetForm');
const modal = document.getElementById('confirmationModal');
const successMessage = document.getElementById('successMessage');

// Función para mostrar el modal
function showModal(email) {
  if (modal) {
    successMessage.textContent = `¡Enlace enviado correctamente a ${email}!`; // Mensaje dinámico
    modal.style.display = 'flex'; // Mostrar el modal
    setTimeout(() => {
      modal.style.display = 'none'; // Cerrar el modal automáticamente después de 3 segundos
    }, 3000);
  } else {
    console.error('El modal no se encuentra en el DOM.');
  }
}

// Evento para manejar el envío del formulario
passwordResetForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar el envío por defecto

  // Obtener el correo electrónico ingresado
  const email = document.getElementById('email').value;

  if (email) {
    // Mostrar el modal de éxito
    showModal(email);

    // Limpiar el formulario
    passwordResetForm.reset();
  } else {
    console.error('El campo de correo electrónico está vacío.');
  }
});