const express = require('express');
const router = express.Router();
const { register, getUsuarios, getUsuarioById, updateUsuario, deleteUsuario } = require('../controllers/userController'); // Import register from userController
const { login } = require('../auth/authController'); // Import login from authController
const verifyToken = require('../auth/authMiddleware');
const { getRoles } = require('../controllers/roleController');
const { getEstados, getEstadoById } = require('../controllers/estadoController');

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication and authorization
 *   - name: Users
 *     description: User management
 *   - name: Roles
 *     description: Role management
 *   - name: Estados
 *     description: Estado management
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - nombre
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               nombre:
 *                 type: string
 *               rol_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     nombre:
 *                       type: string
 *                     token:
 *                       type: string
 *       400:
 *         description: All input is required
 *       409:
 *         description: User already exists
 *       500:
 *         description: Error registering user
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     nombre:
 *                       type: string
 *                     token:
 *                       type: string
 *       400:
 *         description: Invalid Credentials or All input is required
 *       500:
 *         description: Error logging in
 * /protected:
 *   get:
 *     summary: Access a protected resource
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: You have access to protected data
 *       401:
 *         description: Unauthorized - Invalid Token
 *       403:
 *         description: Forbidden - No token provided
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                   available:
 *                     type: boolean
 *       500:
 *         description: Error fetching roles
 * /estados:
 *   get:
 *     summary: Get all estados
 *     tags: [Estados]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of estados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                   available:
 *                     type: boolean
 *       500:
 *         description: Error fetching estados
 * /estados/{id}:
 *   get:
 *     summary: Get a single estado by ID
 *     tags: [Estados]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the estado to retrieve
 *     responses:
 *       200:
 *         description: Estado details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                   available:
 *                     type: boolean
 *       404:
 *         description: Estado not found
 *       500:
 *         description: Error fetching estado by ID
 */
router.post('/register', register);
router.post('/login', login);
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).send(`Bienvenido ${req.user.email}! Tienes acceso a datos protegidos.`);
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error fetching users
 */
router.get('/users', verifyToken, getUsuarios);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Error fetching user
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               rol_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Error updating user
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       500:
 *         description: Error deleting user
 */
router.get('/users/:id', verifyToken, getUsuarioById);
router.put('/users/:id', verifyToken, updateUsuario);
router.delete('/users/:id', verifyToken, deleteUsuario);


router.get('/roles', verifyToken, getRoles);
router.get('/estados', verifyToken, getEstados); // Add the getEstados route
router.get('/estados/:id', verifyToken, getEstadoById); // Add the getEstadoById route

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna un saludo.
 *     tags: [General]
 *     responses:
 *       200:
 *         description: Un saludo simple.
 */
router.get('/', (req, res) => {
  res.send('¡Hola, mundo desde la API!');
});

module.exports = router;
