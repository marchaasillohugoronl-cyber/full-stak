const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombre: String,
    precio: mongoose.Schema.Types.Decimal128,
    stock: Number,
    disponible: Boolean
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;