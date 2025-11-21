const express = require('express');
const router = express.Router();
const { register, getUsuarios, getUsuarioById, updateUsuario, deleteUsuario } = require('../controllers/userController');
const { login } = require('../auth/authController');
const verifyToken = require('../auth/authMiddleware');
const { getRoles } = require('../controllers/roleController');
const { getEstados, getEstadoById } = require('../controllers/estadoController');
const { createExpediente, getExpedientes, getExpedienteById, updateExpediente, deleteExpediente } = require('../controllers/expedienteController');
const { createIndicio, getIndicios, getIndicioById, getIndiciosByExpedienteId, updateIndicio, deleteIndicio } = require('../controllers/indicioController');

router.post('/register', register);
router.post('/login', login);
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).send(`Bienvenido ${req.user.email}! Tienes acceso a datos protegidos.`);
});

router.get('/users', verifyToken, getUsuarios);
router.get('/users/:id', verifyToken, getUsuarioById);
router.put('/users/:id', verifyToken, updateUsuario);
router.delete('/users/:id', verifyToken, deleteUsuario);

router.get('/roles', verifyToken, getRoles);

router.get('/estados', verifyToken, getEstados);
router.get('/estados/:id', verifyToken, getEstadoById);

router.post('/expedientes', verifyToken, createExpediente);
router.get('/expedientes', verifyToken, getExpedientes);
router.get('/expedientes/:id', verifyToken, getExpedienteById);
router.put('/expedientes/:id', verifyToken, updateExpediente);
router.delete('/expedientes/:id', verifyToken, deleteExpediente);

router.post('/indicios', verifyToken, createIndicio);
router.get('/indicios', verifyToken, getIndicios);
router.get('/indicios/expediente/:expediente_id', verifyToken, getIndiciosByExpedienteId);
router.get('/indicios/:id', verifyToken, getIndicioById);
router.put('/indicios/:id', verifyToken, updateIndicio);
router.delete('/indicios/:id', verifyToken, deleteIndicio);

router.get('/', (req, res) => {
  res.send('¡Hola, mundo desde la API!');
});

module.exports = router;