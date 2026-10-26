
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
//crear usuario
exports.createUser=(req,res)=>{
    let data = req.body
    const{nombre, apellido, email, telefono}=data
    console.log(nombre, apellido, email, telefono)
    //ruta

};
//actualizar usuario
exports.updateUser=(req, res)=>{
    let data =req.body
    const{nombre, apellido, email, telefono}= data
    console.log(req.params.id)
    console.log(nombre, apellido, email, telefono)

};

//borrar usaurio
exports.deleteUser=(req, res)=>{
    console.log(req.params.id)
    
}

