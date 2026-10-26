esta es una practica, para usrar next
//para probar el puerto
cd D:\full-hugo\full-stak
///para cosultar el puerto
curl.exe http://localhost:3000/

//para consultar los usuarios

curl.exe -i http://localhost:3000/user
//Consultar usuarios:
curl.exe http://localhost:3000/user
//Consultar el usuario 18:
curl.exe http://localhost:3000/user/18
//Crear usuario:
$json = '{"nombre":"Hugo","apellido":"Machaca","email":"hugo@gmail.com","telefono":"987654321"}'
curl.exe -X POST "http://localhost:3000/user" -H "Content-Type: application/json" -d $json
//Actualizar usuario 18:
$json = '{"nombre":"Hugo","apellido":"Machaca","email":"hugo@gmail.com","telefono":"987654321"}'
curl.exe -X PUT "http://localhost:3000/user/18" -H "Content-Type: application/json" -d $json
//Eliminar usuario 18:
curl.exe -X DELETE "http://localhost:3000/user/18"


let usuarios = [];
let siguienteId = 1;

// Consultar todos los usuarios
exports.getAllUser = (req, res) => {
    res.status(200).json({
        status: 200,
        usuarios: usuarios
    });
};

// Consultar un usuario por ID
exports.getUserById = (req, res) => {
    const usuario = usuarios.find(u => u.id === Number(req.params.id));

    if (!usuario) {
        return res.status(404).json({
            status: 404,
            mensaje: "Usuario no encontrado"
        });
    }

    res.status(200).json({
        status: 200,
        usuario: usuario
    });
};

// Crear usuario
exports.createUser = (req, res) => {
    const { nombre, apellido, email, telefono } = req.body;

    const nuevoUsuario = {
        id: siguienteId++,
        nombre,
        apellido,
        email,
        telefono
    };

    usuarios.push(nuevoUsuario);

    res.status(201).json({
        status: 201,
        mensaje: "Usuario creado correctamente",
        usuario: nuevoUsuario
    });
};

// Actualizar usuario
exports.updateUser = (req, res) => {
    const usuario = usuarios.find(u => u.id === Number(req.params.id));

    if (!usuario) {
        return res.status(404).json({
            status: 404,
            mensaje: "Usuario no encontrado"
        });
    }

    const { nombre, apellido, email, telefono } = req.body;

    if (nombre !== undefined) usuario.nombre = nombre;
    if (apellido !== undefined) usuario.apellido = apellido;
    if (email !== undefined) usuario.email = email;
    if (telefono !== undefined) usuario.telefono = telefono;

    res.status(200).json({
        status: 200,
        mensaje: "Usuario actualizado",
        usuario
    });
};

// Eliminar usuario
exports.deleteUser = (req, res) => {
    const id = Number(req.params.id);
    const indice = usuarios.findIndex(u => u.id === id);

    if (indice === -1) {
        return res.status(404).json({
            status: 404,
            mensaje: "Usuario no encontrado"
        });
    }

    usuarios.splice(indice, 1);

    res.status(200).json({
        status: 200,
        mensaje: "Usuario eliminado correctamente"
    });
};
