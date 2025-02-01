import { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const db = mongoose.connection.db;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const collection = db.collection('saaya_25_be');
  const id = process.env.LOGIN_USER_ID;
  if (!id) {
    res.status(500).json({
      status: 'ERROR',
      message: 'User ID is not defined',
    });
    return;
  }
  const user = await collection.findOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  if (user) {
    if (user.username === username) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(500).json({
          status: 'ERROR',
          message: 'Wrong password',
        });
        return;
      }
      res.status(200).json({ status: 'OK', message: 'Login successful!' });
    }
  } else {
    res.status(401).json({ status: 'ERROR', message: 'User not found' });
  }

  res.status(401).json({ status: 'ERROR', message: 'Invalid credentials!' });
};

export default Login;
