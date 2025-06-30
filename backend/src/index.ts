import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import postsRoutes from './routes/postsRoutes';

dotenv.config();

const app = express();

const allowedOrigins = [
  '*',
];

app.use(
  cors({
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());

app.use('/posts', postsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});