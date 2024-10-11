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