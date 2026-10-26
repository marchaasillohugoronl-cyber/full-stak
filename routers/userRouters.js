
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Consultar usuarios
router.get('/', userController.getAllUser);

// Consultar un usuario por ID
router.get('/:id', userController.getUserById);

// Crear usuario
router.post('/', userController.createUser);

// Actualizar usuario
router.put('/:id', userController.updateUser);

// Eliminar usuario
router.delete('/:id', userController.deleteUser);

module.exports = router;
