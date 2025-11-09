import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 8080;

// Middlewares
app.use(cors());
app.use(express.json());


// Mongo Atlas URL
const dbURL = process.env.MONGO_ATLAS_URL

// mongoDB setup
async function main() {
    try {
      await mongoose.connect(dbURL);
      console.log("connection successful");
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});