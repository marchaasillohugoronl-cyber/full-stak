const ProductoService = require('../services/productoService');
const service = new ProductoService();

exports.create = async (req, res) => {
    try {
        const producto = await service.create(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const productos = await service.getAll();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};