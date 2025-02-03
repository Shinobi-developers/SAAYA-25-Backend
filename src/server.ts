import dotenv from 'dotenv';
import connectDb from './config/dbConfig';
import express, { Request, Response } from 'express';
import cors from 'cors';

import testRoutes from './routes/testRoutes';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';

const app = express();
dotenv.config();

connectDb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/test', testRoutes);
app.use('/user', userRoutes);
app.use('/event', eventRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).redirect('/user/page/login');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${port}`);
});
