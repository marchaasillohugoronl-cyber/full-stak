const CursoService = require('../services/cursoService');
const service = new CursoService();

exports.create = async (req, res) => {
    try {
        const curso = await service.create(req.body);
        res.status(201).json(curso);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const cursos = await service.getAll();
        res.status(200).json(cursos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};