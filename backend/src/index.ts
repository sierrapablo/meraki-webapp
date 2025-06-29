import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


import messagesRoutes from './routes/messageRoutes';


dotenv.config();
const app = express();

const allowedOrigins = [
  'https://sierrapablo.dev',
  'https://www.sierrapablo.dev',
];

app.use(
  cors({
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());

app.use('/messages', messagesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});