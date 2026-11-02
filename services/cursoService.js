const Curso = require('../models/cursoModel');

class CursoService {
    create(data) {
        const curso = new Curso(data);
        return curso.save();
    }

    getAll() {
        return Curso.find();
    }
}

module.exports = CursoService;