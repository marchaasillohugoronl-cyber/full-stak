const Producto = require('../models/productoModel');

class ProductoService {
    create(data) {
        const producto = new Producto(data);
        return producto.save();
    }

    getAll() {
        return Producto.find();
    }
}

module.exports = ProductoService;