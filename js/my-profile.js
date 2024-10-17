function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
  }
  
  // MANEJO DE SESION Y MENU COLAPSABLE DE USUARIO
  const user = localStorage.getItem("user");
  if (user) {
    // ENLACE EN NOMBRE DE USUARIO
    const userLink = document.createElement('a');
    userLink.href = "my-profile.html";
    userLink.textContent = `Hola, ${user}`;
    userLink.classList.add('header__text', 'user-link');
  
    // MENÚ COLAPSABLE EN SI
    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('dropdown-menu');
    
    // ITEMS DEL MENÚ
    const menuItems = [
      { text: 'Mi perfil', href: 'my-profile.html' },
      { text: 'Mis favoritos', href: 'favorites.html' },
      { text: 'Mi Carrito', href: 'cart.html'},
      { text: 'Vender', href: 'sell.html' },
      { text: 'Cerrar sesión', href: '#' }
    ];
  
    menuItems.forEach(item => {
      const menuItem = document.createElement('a');
      menuItem.href = item.href;
      menuItem.textContent = item.text;
      menuItem.classList.add('dropdown-item');
      dropdownMenu.appendChild(menuItem);
  
      // CERRAR SESIÓN
      if (item.text === 'Cerrar sesión') {
        menuItem.addEventListener('click', logout);
      }
    });
  
    // SE AÑADE EL MENÚ AL CONTENEDOR
    const nav = document.querySelector('nav');
    const userMenuContainer = document.createElement('div');
    userMenuContainer.classList.add('user-menu-container');
    userMenuContainer.appendChild(userLink);
    userMenuContainer.appendChild(dropdownMenu);
    nav.appendChild(userMenuContainer);
  
  } else {
    window.location.href = "login.html";
  }

// LÍMITE DEL TAMAÑO DE IMAGEN
const imageSizeLimit = 4 * 1024 * 1024; 

// CARGA DE IMAGEN DESDE LOCALSTORAGE O PREDETERMINADA
window.addEventListener('DOMContentLoaded', () => {
    const profilePicture = document.getElementById('profile-picture');
    const savedImage = localStorage.getItem('profileImage');
    
    profilePicture.src = savedImage || 'img/default-profile.png';
});

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

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío por defecto
  
    // Obtener los valores de los campos
    const primerNombre = document.getElementById('primer-nombre').value;
    const segundoNombre = document.getElementById('segundo-nombre').value;
    const primerApellido = document.getElementById('primer-apellido').value;
    const segundoApellido = document.getElementById('segundo-apellido').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('celular').value;
  
    // Verificar que los campos obligatorios (primer nombre, primer apellido, email) no estén vacíos
    if (primerNombre && primerApellido && email) {
      // Guardar los valores en localStorage
      localStorage.setItem('primerNombre', primerNombre);
      localStorage.setItem('segundoNombre', segundoNombre);
      localStorage.setItem('primerApellido', primerApellido);
      localStorage.setItem('segundoApellido', segundoApellido);
      localStorage.setItem('email', email);
      localStorage.setItem('celular', celular);
  
      // Mensaje de éxito
    } 
  });
  // Seleccionar elementos del DOM
const form = document.getElementById('myForm');
const modal = document.getElementById('confirmationModal');
const closeModal = document.querySelector('.close-btn');

// Función para mostrar el modal
function showModal() {
  modal.style.display = 'flex'; // Mostrar el modal
}

// Función para cerrar el modal
function closeModalWindow() {
  modal.style.display = 'none'; // Ocultar el modal
}

// Escuchar el envío del formulario
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar que se envíe el formulario
  // Mostrar el modal si el formulario es válido
  if (form.checkValidity()) {
    showModal();
  }
});

// Cerrar el modal cuando se hace clic en la 'x'
closeModal.addEventListener('click', closeModalWindow);

// Cerrar el modal cuando se hace clic fuera del contenido
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    closeModalWindow();
  }
});
