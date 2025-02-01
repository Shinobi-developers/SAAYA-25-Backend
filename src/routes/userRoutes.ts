import express from 'express';
import { Request, Response } from 'express';
import path from 'path';

const router = express.Router();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
router.use('/user', express.static(path.join(__dirname, '../static')));

router.get('/login', (req: Request, res: Response): void => {
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

export default router;
