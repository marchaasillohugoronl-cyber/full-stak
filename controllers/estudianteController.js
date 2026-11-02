const EstudianteService = require('../services/estudianteService');
const service = new EstudianteService();

exports.create = async (req, res) => {
    try {
        const estudiante = await service.create(req.body);
        res.status(201).json(estudiante);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const estudiantes = await service.getAll();
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};