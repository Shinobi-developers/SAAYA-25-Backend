import express from 'express';
import { Request, Response } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

const router = express.Router();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
router.use('/user', express.static(path.join(__dirname, '../static')));

// Send login page
router.get('/page/login', (req: Request, res: Response): void => {
  const filePath = path.join(__dirname, '../static/login.html');
  const fixedPath = filePath.replace(/^\\/, '');
  res.sendFile(fixedPath, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('Error serving file:', err);
      res.status(500).send('Server error');
    }
  });
});

//login page api
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  if (!username || !password || username == '' || password === '') {
    res.status(500).send('Username and password must not be empty');
  }
  const db = mongoose.connection.db;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const collection = db.collection('saaya_25_be');
  const user = await collection.findOne({
    username,
  });
  if (user) {
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (isPasswordValid) {
      const payload = {
        id: user._id,
        username,
      };
      const secret =
        process.env.JWT_SECRET_KEY || randomBytes(length).toString('hex');
      const token = jwt.sign(payload, secret, { expiresIn: '30m' });
      res.json({ message: 'Login successful', token });
    } else {
      res.status(500).send('Invalid credentials');
    }
  } else {
    res.status(404).send(`User with username ${username} not found`);
  }
});

export default router;
