
const User = require('../models/userModel');

class UserService {

    // Obtener todos los usuarios
    getAll() {
        return User.find();
    }

    // Buscar usuario por ID
    async filterById(id) {
        return User.findById(id);
    }

    // Crear usuario
    async create(data) {
        const user = new User(data);
        return await user.save();
    }

    // Actualizar usuario
    update(id, data) {
        return User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
    }

    // Eliminar usuario
    async delete(id) {
        return User.findByIdAndDelete(id);
    }
}

module.exports = UserService;
