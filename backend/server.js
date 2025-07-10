const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// Load environment variables
dotenv.config();

// Connect to database
connectDatabase();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/loans', require('./routes/loans'));
// app.use('/api/offers', require('./routes/offers'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'P2P Lending API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});