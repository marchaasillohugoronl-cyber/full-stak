const express = require('express')
const router = express.Router()

// Importa los controladores
const userController = require('../controllers/userController')

// Define la ruta GET para consultar todos los usuarios
router.get('/', userController.getAllUser)

// Exporta las rutas
module.exports = router