
const express = require('express');
const app = express();

// Permite recibir datos JSON
app.use(express.json());

// Importa las rutas de usuarios
const userRouter = require('./routers/userRouters');

// Registra las rutas bajo /user
app.use('/user', userRouter);

// Ruta principal
app.get('/', (req, res) => {
    console.log("Servidor creado con Express.js");
    res.send("Servidor creado con Express.js");
});

// Inicia el servidor
app.listen(3000, () => {
    console.log('Aplicacion con express ejecutandose en el puerto 3000');
});
