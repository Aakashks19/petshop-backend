const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes placeholders
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/pets', require('./routes/petRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Health check route
app.get('/api/health', async (req, res) => {
    try {
        const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
        res.send({ status: 'OK', database: dbStatus, env: process.env.NODE_ENV });
    } catch (e) {
        res.status(500).send({ status: 'Error', message: e.message });
    }
});

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://aakashks1903_db_user:pRrCNDH06Ie81Jvj@cluster0.8g8kxge.mongodb.net/petshop?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => console.error('DB Connection Error. Check your IP whitelist on Atlas:', err.message));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!', error: err.message });
});
