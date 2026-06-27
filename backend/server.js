const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// Load env vars
dotenv.config();

// Load db
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON bodies

// Routes
app.use('/api/tasks', require('./routes/taskRoutes'));

// Basic test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});