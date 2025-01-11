require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

// Initialize the Express App
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());               // Allow cross-origin requests
app.use(express.json());       // Parse incoming JSON data

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', blogRoutes);
app.use('/api/admin', adminRoutes);

// Root Route for Basic Testing
app.get('/', (req, res) => {
    res.send('✅ RBAC Blog Platform Backend is Running!');
});

// Error Handling Middleware (Global Error Handler)
app.use((err, req, res, next) => {
    console.error('Server Error:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
