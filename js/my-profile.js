// LÍMITE DEL TAMAÑO DE IMAGEN DE USUARIO
const imageSizeLimit = 4 * 1024 * 1024; 

// CARGA DE IMAGEN DESDE LOCALSTORAGE O PREDETERMINADA
window.addEventListener('DOMContentLoaded', () => {
  const profilePicture = document.getElementById('profile-picture');
  const savedImage = localStorage.getItem('profileImage');
  
  profilePicture.src = savedImage || 'img/default-profile.png';

// CARGA DE UNA NUEVA IMAGEN
document.getElementById('upload').addEventListener('change', (event) => {
  const file = event.target.files[0];
  
  // VERIFICACIÓN DEL LÍMITE DE TAMAÑO
  if (file && file.size > imageSizeLimit) {
      alert("La imagen es demasiado grande. Elige una imagen de menos de 4 MB.");
      return;
  }

  if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
          const newImage = e.target.result;
          document.getElementById('profile-picture').src = newImage;
          localStorage.setItem('profileImage', newImage);
      };
      
      reader.readAsDataURL(file);
  }
});

// ELIMINAR LA IMAGEN CARGADA Y DEJAR LA PREDETERMINADA
document.getElementById('remove-picture').addEventListener('click', () => {
  document.getElementById('profile-picture').src = 'img/default-profile.png';
  localStorage.removeItem('profileImage');
});
  
// GUARDA EL DATO DE EMAIL EN EL FORMULARIO
const emailField = document.getElementById('email');
const savedEmail = localStorage.getItem('user');
if (!savedEmail) {
    window.location.href = 'login.html';
    return;
}
emailField.value = savedEmail;
document.getElementById('primer-nombre').value = localStorage.getItem('primerNombre') || '';
document.getElementById('segundo-nombre').value = localStorage.getItem('segundoNombre') || '';
document.getElementById('primer-apellido').value = localStorage.getItem('primerApellido') || '';
document.getElementById('segundo-apellido').value = localStorage.getItem('segundoApellido') || '';
document.getElementById('celular').value = localStorage.getItem('celular') || '';
});

// FUNCIÓN PARA GUARDAR INPUTS EN LOCALSTORAGE
document.querySelector('form').addEventListener('submit', function(event) {

event.preventDefault();
const primerNombre = document.getElementById('primer-nombre').value;
const segundoNombre = document.getElementById('segundo-nombre').value;
const primerApellido = document.getElementById('primer-apellido').value;
const segundoApellido = document.getElementById('segundo-apellido').value;
const email = document.getElementById('email').value;
const celular = document.getElementById('celular').value;

if (primerNombre && primerApellido && email) {
    localStorage.setItem('primerNombre', primerNombre);
    localStorage.setItem('segundoNombre', segundoNombre);
    localStorage.setItem('primerApellido', primerApellido);
    localStorage.setItem('segundoApellido', segundoApellido);
    localStorage.setItem('user', email);
    localStorage.setItem('celular', celular);
    showModal();
}
});

// MODAL DE DATOS GUARDADOS
const modal = document.getElementById('confirmationModal');
const closeModal = document.querySelector('.close-btn');
function showModal() {
modal.style.display = 'flex';
}
function closeModalWindow() {
modal.style.display = 'none';
}


form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar que se envíe el formulario
  // Mostrar el modal si el formulario es válido
  if (form.checkValidity()) {
    showModal();
  }
});

// Cerrar el modal cuando se hace clic en la 'x'

closeModal.addEventListener('click', closeModalWindow);
window.addEventListener('click', function(event) {
if (event.target === modal) {
    closeModalWindow();
}
});