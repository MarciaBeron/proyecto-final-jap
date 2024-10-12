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
      alert('Datos guardados exitosamente');
    } else {
      // Mensaje de error si faltan campos obligatorios
      alert('Por favor, completa los campos obligatorios: Primer nombre, Primer apellido y Correo electrónico.');
    }
  });
  