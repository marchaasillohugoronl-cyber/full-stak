const EmpleadoService = require('../services/empleadoService');
const service = new EmpleadoService();

exports.create = async (req, res) => {
    try {
        const empleado = await service.create(req.body);
        res.status(201).json(empleado);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const empleados = await service.getAll();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};