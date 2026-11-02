const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
    nombre: String,
    apellido: String,
    edad: Number,
    promedio: mongoose.Schema.Types.Decimal128,
    matriculado: Boolean
});

const Estudiante = mongoose.model('Estudiante', estudianteSchema);

module.exports = Estudiante;