import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from 'utils/db.js';
import todoRouter from 'routes/todo.js';

dotenv.config();

const app = express();
const PORT: string | number = process.env.PORT || 5000;

app.use(express.json());

app.use('/todos', todoRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
