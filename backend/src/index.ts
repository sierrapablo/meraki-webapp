import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { errorHandler } from './middlewares/errorHandler';
import postsRoutes from './routes/postsRoutes';

dotenv.config();

const app = express();

const allowedOrigins = [
  '*',
];

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

app.use('/posts', postsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
