
const UserService = require('../services/userService');
const userService = new UserService();

exports.getAllUser = async (req, res) => {
    try {
        const users = await userService.getAll();

        res.status(200).json(users);

    } catch (error) {
        console.log("ERROR:", error);

        res.status(500).json({
            mensaje: "Error al obtener usuarios",
            error: error.message
        });
    }
};

// Obtener usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userService.filterById(id);

        if (!user) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar usuario" });
    }
};

// Crear usuario
exports.createUser = async (req, res) => {
    try {
        const data = req.body;
        await userService.create(data);

        res.status(201).send("Usuario Registrado");
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al registrar usuario"
        });
    }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const user = await userService.update(id, data);

        if (!user) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Usuario actualizado",
            usuario: user
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar usuario"
        });
    }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userService.delete(id);

        if (!user) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Usuario eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar usuario"
        });
    }
};
