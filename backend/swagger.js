const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Prueba tecnica MP',
    version: '1.0.0',
    description: 'Documentación de la API Prueba tecnica MP',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor',
    },
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64'
          },
          email: {
            type: 'string'
          },
          nombre: {
            type: 'string'
          },
          rol_id: {
            type: 'integer'
          },
          available: {
            type: 'boolean'
          },
          created_at: {
            type: 'string',
            format: 'date-time'
          },
          updated_at: {
            type: 'string',
            format: 'date-time'
          }
        }
      },
      Expediente: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64'
          },
          descripcion: {
            type: 'string'
          },
          justificacion_rechazo: {
            type: 'string'
          },
          tecnico_id: {
            type: 'integer'
          },
          coordinador_id: {
            type: 'integer'
          },
          estado_id: {
            type: 'integer'
          },
          created_at: {
            type: 'string',
            format: 'date-time'
          },
          updated_at: {
            type: 'string',
            format: 'date-time'
          },
          available: {
            type: 'boolean'
          }
        }
      },
      Indicio: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64'
          },
          descripcion: {
            type: 'string'
          },
          color: {
            type: 'string'
          },
          tamanio: {
            type: 'string'
          },
          peso: {
            type: 'string'
          },
          ubicacion: {
            type: 'string'
          },
          tecnica_registrada: {
            type: 'string'
          },
          tecnico_id: {
            type: 'integer'
          },
          expediente_id: {
            type: 'integer'
          },
          created_at: {
            type: 'string',
            format: 'date-time'
          },
          updated_at: {
            type: 'string',
            format: 'date-time'
          },
          available: {
            type: 'boolean'
          }
        }
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/swagger-docs.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
