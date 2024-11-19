const express = require('express');
const path = require('path');

const app = express();

// Ruta fija directamente a la carpeta donde está el index.html
const projectPath = 'C:\\Users\\Madmoaselle\\Desktop\\JAP\\50547878_entrega7\\proyecto-final-jap';

// Servir archivos estáticos desde la carpeta correcta
app.use(express.static(projectPath));

// Ruta principal (apuntando al index.html correcto)
app.get('/', (req, res) => {
    res.sendFile(path.join(projectPath, 'index.html'));
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Buscando index.html en: ${path.join(projectPath, 'index.html')}`);
    console.log(`Revisá en: http://localhost:${PORT}`);
});
