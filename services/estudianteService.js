const Estudiante = require('../models/estudianteModel');

class EstudianteService {
    create(data) {
        const estudiante = new Estudiante(data);
        return estudiante.save();
    }

    getAll() {
        return Estudiante.find();
    }
}

module.exports = EstudianteService;