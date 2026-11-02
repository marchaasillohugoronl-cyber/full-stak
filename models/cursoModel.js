const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
    nombre: String,
    descripcion: String,
    horas: Number,
    costo: mongoose.Schema.Types.Decimal128,
    certificado: Boolean
});

const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso;