const mongoose = require('mongoose');
const { db } = require('../config');

const connection = mongoose.connect(`mongodb://${db.host}:${db.port}/${db.database}`)

//
.then(() => {
    console.log('Conexion exitosa');
})
.catch((error) => {
    console.error('Error al conectarse a MongoDB:', error.message);
});

//esta apagado esa variable pero con module se enciende
module.exports = connection;
