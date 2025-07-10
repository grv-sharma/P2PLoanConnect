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
// This was done because Express-6 has strict routing and does not allow wildcard routes like '/*' to be defined
// directly. Instead, we use '/*splat' to catch all unmatched routes.
// This is useful for handling 404 errors or redirecting to a custom 404 page.
// Note: '/*splat' is a special route that matches all paths and captures the remaining part of the URL as a parameter named 'splat'.
// This allows us to handle all unmatched routes in a single middleware function.
// If you want to handle specific routes, you can define them before this middleware.
// For example, if you have a route like '/api/users', it will be matched before this middleware, and any unmatched routes will fall through to this handler.
// This is a common pattern in Express applications to ensure that all routes are handled properly and to provide a consistent response for unmatched routes.   

app.use('/*splat', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});