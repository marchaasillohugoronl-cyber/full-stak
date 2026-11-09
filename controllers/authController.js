const AuthService = require('../services/authService');

const authService = new AuthService();

// Registrar administrador
exports.register = async (req, res) => {
    try {
        const user = await authService.register(req.body);

        res.status(201).json({
            mensaje: "Usuario del administrador registrado exitosamente",
            user: { id: user._id, email: user.email }
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Iniciar sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);

        return res.json({
            mensaje: "Inicio de sesión exitoso",
            token
        });

    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message
        });
    }
};
