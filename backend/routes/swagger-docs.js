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
 *   - name: Expedientes
 *     description: Expediente management
 *   - name: Indicios
 *     description: Indicio management
 *   - name: General
 *     description: General endpoints
 */

/**
 * @swagger
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
 */

/**
 * @swagger
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
 */

/**
 * @swagger
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
 */

/**
 * @swagger
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
 */

/**
 * @swagger
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
 */

/**
 * @swagger
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

/**
 * @swagger
 * /expedientes:
 *   get:
 *     summary: Get all expedientes
 *     tags: [Expedientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of expedientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expediente'
 *       500:
 *         description: Error fetching expedientes
 *   post:
 *     summary: Create a new expediente
 *     tags: [Expedientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - descripcion
 *               - tecnico_id
 *               - coordinador_id
 *               - estado_id
 *             properties:
 *               descripcion:
 *                 type: string
 *               tecnico_id:
 *                 type: integer
 *               coordinador_id:
 *                 type: integer
 *               estado_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Expediente created successfully
 *       400:
 *         description: All input is required
 *       500:
 *         description: Error creating expediente
 */

/**
 * @swagger
 * /expedientes/{id}:
 *   get:
 *     summary: Get a single expediente by ID
 *     tags: [Expedientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the expediente to retrieve
 *     responses:
 *       200:
 *         description: Expediente details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expediente'
 *       404:
 *         description: Expediente not found
 *       500:
 *         description: Error fetching expediente
 *   put:
 *     summary: Update an expediente
 *     tags: [Expedientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the expediente to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *               justificacion_rechazo:
 *                 type: string
 *               tecnico_id:
 *                 type: integer
 *               coordinador_id:
 *                 type: integer
 *               estado_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Expediente updated successfully
 *       500:
 *         description: Error updating expediente
 *   delete:
 *     summary: Delete an expediente
 *     tags: [Expedientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the expediente to delete
 *     responses:
 *       200:
 *         description: Expediente deleted successfully
 *       500:
 *         description: Error deleting expediente
 */

/**
 * @swagger
 * /indicios:
 *   get:
 *     summary: Get all indicios
 *     tags: [Indicios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of indicios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Indicio'
 *       500:
 *         description: Error fetching indicios
 *   post:
 *     summary: Create a new indicio
 *     tags: [Indicios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - descripcion
 *               - color
 *               - tamanio
 *               - peso
 *               - ubicacion
 *               - tecnica_registrada
 *               - tecnico_id
 *               - expediente_id
 *             properties:
 *               descripcion:
 *                 type: string
 *               color:
 *                 type: string
 *               tamanio:
 *                 type: string
 *               peso:
 *                 type: string
 *               ubicacion:
 *                 type: string
 *               tecnica_registrada:
 *                 type: string
 *               tecnico_id:
 *                 type: integer
 *               expediente_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Indicio created successfully
 *       400:
 *         description: All input is required
 *       500:
 *         description: Error creating indicio
 */

/**
 * @swagger
 * /indicios/expediente/{expediente_id}:
 *   get:
 *     summary: Get all indicios by expediente ID
 *     tags: [Indicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: expediente_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the expediente to retrieve indicios from
 *     responses:
 *       200:
 *         description: A list of indicios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Indicio'
 *       500:
 *         description: Error fetching indicios
 */

/**
 * @swagger
 * /indicios/{id}:
 *   get:
 *     summary: Get a single indicio by ID
 *     tags: [Indicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the indicio to retrieve
 *     responses:
 *       200:
 *         description: Indicio details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Indicio'
 *       404:
 *         description: Indicio not found
 *       500:
 *         description: Error fetching indicio
 *   put:
 *     summary: Update an indicio
 *     tags: [Indicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the indicio to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *               color:
 *                 type: string
 *               tamanio:
 *                 type: string
 *               peso:
 *                 type: string
 *               ubicacion:
 *                 type: string
 *               tecnica_registrada:
 *                 type: string
 *     responses:
 *       200:
 *         description: Indicio updated successfully
 *       500:
 *         description: Error updating indicio
 *   delete:
 *     summary: Delete an indicio
 *     tags: [Indicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the indicio to delete
 *     responses:
 *       200:
 *         description: Indicio deleted successfully
 *       500:
 *         description: Error deleting indicio
 */

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
