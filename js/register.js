// Obtener referencias al formulario y al modal
const registerForm = document.getElementById('registerForm');
const modal = document.getElementById('confirmationModal');

// Función para mostrar el modal
function showModal() {
  if (modal) {
    modal.style.display = 'flex';
  } else {
    console.error('El modal no se encuentra en el DOM.');
  }
}

// Función para cerrar el modal
function closeModal() {
  if (modal) {
    modal.style.display = 'none';
  } else {
    console.error('El modal no se encuentra en el DOM.');
  }
}

// Cerrar modal al hacer clic en cualquier parte de la pantalla
window.addEventListener('click', function () {
  closeModal();
});

// Evento de envío del formulario
registerForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar el envío inmediato del formulario

  // Obtener los valores de los campos
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
    return;
  }

  // Guardar los datos en localStorage
  const userData = { username, email };
  localStorage.setItem('registeredUser', JSON.stringify(userData));

  // Mostrar el modal de confirmación
  showModal();

  // Limpiar los campos del formulario
  registerForm.reset();
});
