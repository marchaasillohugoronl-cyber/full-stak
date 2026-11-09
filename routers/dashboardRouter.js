const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/verifyToken');

// El navegador carga esta vista; el frontend verifica la sesión antes de mostrarla.
router.get('/', (req, res) => {
    res.render('index', { title: 'Dashboard' });
});

// Endpoint protegido para validar el JWT.
router.get('/verify', verifyToken, (req, res) => {
    res.status(200).json({ mensaje: 'Sesión válida' });
});

module.exports = router;
