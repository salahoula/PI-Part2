const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Service de Commandes API',
      version: '1.0.0',
      description: 'API pour la gestion des commandes et du panier',
    },
    servers: [
      {
        url: 'http://localhost:3003',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', orderRoutes);
app.use('/cart', cartRoutes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/orders')
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur de connexion MongoDB:', err));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur est survenue!' });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Service de commandes démarré sur le port ${PORT}`);
});

module.exports = app;
