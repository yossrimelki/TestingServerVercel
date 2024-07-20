const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const AuthRoute = require('./routes/auth'); 
const ShoesRoute = require('./routes/shoes'); 
const watchRoutes = require('./routes/watch');
const reclamationRoutes = require('./routes/reclamation');
const commandeRoute = require('./routes/commande');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); // Ensure JSON body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.database_uri)
  .then(() => console.log('Database Connection Established!'))
  .catch(err => console.error('Database connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('hello from simple server :)');
});

app.use('/api', AuthRoute);
app.use('/api/shoes', ShoesRoute);
app.use('/api/watches', watchRoutes);
app.use('/api/reclamation', reclamationRoutes);
app.use('/api/commandes', commandeRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
