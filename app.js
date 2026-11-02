const express = require('express');
const app = express();
const path = require('path');
const connection = require('./database/connection');

// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Importar rutas
const estudianteRouter = require('./routers/estudianteRouters');
const productoRouter = require('./routers/productoRouters');
const empleadoRouter = require('./routers/empleadoRouters');
const cursoRouter = require('./routers/cursoRouters');
const userRouter = require('./routers/userRouters');

// Registrar rutas
app.use('/estudiantes', estudianteRouter);
app.use('/productos', productoRouter);
app.use('/empleados', empleadoRouter);
app.use('/cursos', cursoRouter);
app.use('/user', userRouter);

// Página principal
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Sistema de Gestión'
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor ejecutándose en el puerto 3000');
});