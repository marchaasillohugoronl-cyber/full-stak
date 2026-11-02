const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleadoSchema = new Schema({
    nombre: String,
    cargo: String,
    edad: Number,
    sueldo: mongoose.Schema.Types.Decimal128,
    activo: Boolean
});

const Empleado = mongoose.model('Empleado', empleadoSchema);

module.exports = Empleado;