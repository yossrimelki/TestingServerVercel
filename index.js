const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();



const bodyParser = require('body-parser');
const AuthRoute  = require('./routes/auth') 
const ShoesRoute  = require('./routes/shoes') 
const watchRoutes = require('./routes/watch')
const reclamationRoutes = require('./routes/reclamation')
const commandeRoute  = require('./routes/commande') 


const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.database_uri);

const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err);
});
db.once('open', () => {
    console.log('Database Connection Established!');
});

// Routes
app.get('/', (req, res) => {
    res.send('hello from simple server :)');
});

app.use('/api', AuthRoute);
app.use('/api/shoes',ShoesRoute);
app.use('/api/watches', watchRoutes);
app.use('/api/reclamation',reclamationRoutes);
app.use('/api/commandes', commandeRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
