const Empleado = require('../models/empleadoModel');

class EmpleadoService {
    create(data) {
        const empleado = new Empleado(data);
        return empleado.save();
    }

    getAll() {
        return Empleado.find();
    }
}

module.exports = EmpleadoService;