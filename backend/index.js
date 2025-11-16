import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import conversationRoutes from './routes/conversationRoutes.js';

const app = express();
const PORT = 8080;

// Middlewares
dotenv.config();
app.use(cors());
app.use(express.json());


// Mongo Atlas URL
const dbURL = process.env.MONGO_ATLAS_URL

// mongoDB setup
async function main() {
    try {
      await mongoose.connect(dbURL, {
        // name of DB
        dbName: 'simple-intelligence'
      });

      console.log("DB connection successful!");
    } catch (err) {
      console.error("Error connecting to the database:", err);
    };
};
// call the main function
main();

// Basic handshake route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'success',
    message: 'Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// ================= Routes ====================
app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationRoutes);



// ================== Errors ======================

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});


// ==================== Start server =================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});