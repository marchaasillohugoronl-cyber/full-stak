esta es una practica, para usrar next
//para probar el puerto
cd D:\full-hugo\full-stak
///para cosultar el puerto
curl.exe http://localhost:3000/

//para consultar los usuarios

curl.exe -i http://localhost:3000/user
//Consultar usuarios:
curl.exe http://localhost:3000/user
//Consultar el usuario 18:
curl.exe http://localhost:3000/user/18
//Crear usuario:
$json = '{"nombre":"Hugo","apellido":"Machaca","email":"hugo@gmail.com","telefono":"987654321"}'
curl.exe -X POST "http://localhost:3000/user" -H "Content-Type: application/json" -d $json
//Actualizar usuario 18:
$json = '{"nombre":"Hugo","apellido":"Machaca","email":"hugo@gmail.com","telefono":"987654321"}'
curl.exe -X PUT "http://localhost:3000/user/18" -H "Content-Type: application/json" -d $json
//Eliminar usuario 18:
curl.exe -X DELETE "http://localhost:3000/user/18"

=================================================
//levantar los servicios
Start-Service MongoDB
//2. Entrar nuevamente a MongoDB
& "$env:LOCALAPPDATA\Programs\mongosh\mongosh.exe" "mongodb://127.0.0.1:27017"
//Después selecciona tu base de datos:
use fullstak
//Comprueba tus usuarios:
db.usuarios.find()

# Full Stak

Proyecto de práctica desarrollado con Node.js, Express y MongoDB. El objetivo es construir una API para gestionar usuarios y aprender sobre rutas, controladores, bases de datos y autenticación.

## 1. Tecnologías utilizadas

- **Node.js:** entorno de ejecución de JavaScript.
- **Express:** framework para crear el servidor y las rutas HTTP.
- **MongoDB:** base de datos NoSQL.
- **MongoDB Shell (`mongosh`):** consola para administrar MongoDB.
- **EJS:** motor de plantillas para generar vistas HTML.
- **JSON:** formato para intercambiar datos entre el cliente y el servidor.
- **JWT (pendiente de implementar):** mecanismo para verificar tokens de autenticación.

## 2. Ubicación del proyecto


Estructura conocida:

```text
full-stak/
├── app.js
├── package.json
├── package-lock.json
├── controllers/
│   └── userController.js
├── routers/
│   └── userRouters.js
├── views/
├── node_modules/
└── usuario.json
```

La estructura puede cambiar conforme avance el desarrollo.

## 3. Versiones instaladas

| Tecnología | Versión |
|---|---|
| MongoDB Server | 8.0.11 |
| MongoDB Shell | 2.14.0 |
| MongoDB Compass | 1.53.1 |
| Node.js | Verificar con `node -v` |
| Express | Verificar en `package.json` |
| EJS | Instalado mediante `npm i ejs` |

## 4. Cómo iniciar el proyecto

### Paso 1. Abrir PowerShell

```powershell
cd D:\full-hugo\full-stak
```

### Paso 2. Instalar las dependencias

Solo si es una instalación nueva o faltan dependencias:

```powershell
npm install
```

### Paso 3. Iniciar el servidor

Usar el comando definido en `package.json`. Por ejemplo, si existe el script `start`:

```