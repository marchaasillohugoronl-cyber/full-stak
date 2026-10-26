
 // Controlador que accederá a todos los usuarios
exports.getAllUser = (req, res) => {
    console.log("Accediendo a todos los usuarios");

    res.status(200).json({
        status: 200,
        mensaje: "Accediendo a todos los usuarios"
    });
};

// Controlador que accederá a un usuario por su ID
exports.getUserById = (req, res) => {
    console.log("Accediendo al usuario con id: " + req.params.id);

    res.status(200).json({
        status: 200,
        mensaje: "Accediendo al usuario con id: " + req.params.id
    });
};

// Crear usuario
exports.createUser = (req, res) => {
    let data = req.body;
    const { nombre, apellido, email, telefono } = data;

    console.log(nombre, apellido, email, telefono);

    res.status(200).json({
        status: 200,
        mensaje: "Usuario recibido correctamente",
        usuario: { nombre, apellido, email, telefono }
    });
};

// Actualizar usuario
exports.updateUser = (req, res) => {
    let data = req.body;
    const { nombre, apellido, email, telefono } = data;

    console.log(req.params.id);
    console.log(nombre, apellido, email, telefono);

    res.status(200).json({
        status: 200,
        mensaje: "Datos de usuario recibidos para actualizar",
        id: req.params.id,
        usuario: { nombre, apellido, email, telefono }
    });
};

// Borrar usuario
exports.deleteUser = (req, res) => {
    console.log(req.params.id);

    res.status(200).json({
        status: 200,
        mensaje: "Solicitud de eliminación recibida",
        id: req.params.id
    });
};
