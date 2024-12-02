# Instructivo para ejecutar el proyecto backend:

* Paso 1: Descarga y descomprime el proyecto:
Descarga el archivo .zip del backend desde el repositorio disponible.
Descomprime el archivo en tu computadora.
Ubica la carpeta descomprimida, que será el directorio principal del proyecto, recomendamos instalarlo directamente en el Escritorio/Desktop.

* Paso 2: Instalar los requisitos necesarios:
Instalar Node.js y npm:
Ve a https://nodejs.org y descarga la versión LTS (Long Term Support). Durante la instalación, asegúrate de seleccionar la opción para instalar npm.

Cómo verificar si se instaló correctamente:
Abre tu terminal o PowerShell y escribe:
node --version
npm --version
Debes ver números de versión, como v18.18.0 (para Node.js) y 8.19.2 (para npm).

Instalar Git (si no lo tienes):
Ve a https://git-scm.com/ y descarga e instala Git.
Verifica con:
git --version

* Paso 3: Clonar el repositorio:
Abre tu terminal o PowerShell.
Navega al directorio donde quieras guardar el proyecto (por ejemplo, tu escritorio): 
cd C:\Users\<TU_USUARIO>\Desktop

Clona el proyecto usando este comando:
git clone https://github.com/MarciaBeron/backend-proyecto-final-jap

Ingresa a la carpeta del backend: cd backend-proyecto-final-jap

* Paso 4: Instalar las dependencias:
Asegúrate de estar dentro del directorio del backend.
Ejecuta el siguiente comando para instalar las dependencias del proyecto:
npm install
Esto descargará todas las librerías necesarias.

* Paso 5: Ejecutar el servidor:
Para iniciar el servidor, usa:
npm start
O, si el proyecto utiliza un script de desarrollo, prueba:
npm run dev
Deberías ver: servidor iniciado.

* Paso 6: Probar que todo funciona:
Abre tu navegador y ve a la dirección indicada: http://localhost:3000

Problemas comunes y soluciones:
Error: "Command not found" al usar npm o node:
Asegúrate de haber instalado Node.js correctamente.
Reinicia tu terminal.

Error: "Module not found" al ejecutar el servidor:
Reinstala las dependencias con:
npm install

Error relacionado al puerto (puerto en uso):
Cambia el puerto en el archivo .env o en el código fuente del proyecto.

Problema con la base de datos:
Asegúrate de que el sistema de base de datos (MySQL, MongoDB, etc.) esté instalado y configurado.
Consulta el equipo para más detalles sobre la conexión.

### IMPORTANTE
_Este instructivo no explica el funcionamiento de la base de datos. Proximamente se actualizará_