import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import todoRouter from './routes/todo.js';
import { connectDB } from './utils/db.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 8080;

app.use(
  cors({
    origin: process.env.FRONTEND_HOST,
  })
);
app.use(express.json());

app.use('/todos', todoRouter);

connectDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log('Trying to connect to Mongo:', process.env.MONGO_URI);
      console.log('CORS ORIGIN:', process.env.FRONTEND_HOST);
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });
