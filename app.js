const express = require('express');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Permite recibir datos JSON
app.use(express.json());

// Importa las rutas de usuarios
const userRouter = require('./routers/userRouters');
app.use('/user', userRouter);

// Ruta principal
app.get('/', (req, res) => {
    const data = {
        title: 'Bienvenido a mi sitio web',
        showMessage: true,
        message: 'Este es un mensaje desde Express',
        items: [1, 2, 3, 4, 5]
    };

    res.render('index', data);
});

// Inicia el servidor
app.listen(3000, () => {
    console.log('Aplicación ejecutándose en el puerto 3000');
});