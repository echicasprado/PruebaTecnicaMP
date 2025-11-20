require('dotenv').config()

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const apiRouter = require('./routes/api');
const { connectDb } = require('./config/db');
const db = require('./models'); // Import the centralized db object
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', apiRouter);

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Failed to connect to the database:', err);
  process.exit(1);
});
