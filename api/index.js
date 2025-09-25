const express = require('express');
const cors = require('cors');
require('dotenv').config();

// --- Database Connection (Choose one) ---
// const connectDB = require('./config/db.mongo');
// connectDB(); // For MongoDB

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('<h1>AI Website Builder API</h1><p>Welcome to the Zayyansencetech API.</p>');
});

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/websites', require('./routes/websiteRoutes'));


const PORT = process.env.PORT || 5000;

// This export is required for Vercel
module.exports = app;
