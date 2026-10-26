
 // Controlador que accederá a todos los usuarios
exports.getAllUser = (req, res) => {
    console.log("Accediendo a todos los usuarios");
    res.send("Accediendo a todos los usuarios");
};

// Controlador que accederá a un usuario por su ID
exports.getUserById = (req, res) => {
    console.log("Accediendo al usuario con id: " + req.params.id);
    res.send("Accediendo al usuario con id: " + req.params.id);
};
