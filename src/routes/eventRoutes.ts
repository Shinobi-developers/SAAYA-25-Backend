import express from 'express';
import { Request, Response } from 'express';
import path from 'path';
import authenticateJWT from '../middlewares/authenticate';

const router = express.Router();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
router.use('/event', express.static(path.join(__dirname, '../static')));

// Send add points page
router.get('/page/add-point', (req: Request, res: Response): void => {
  const isAuthenticated = authenticateJWT(req);
  if (!isAuthenticated) {
    return res.redirect('/user/page/login');
  }
  const filePath = path.join(__dirname, '../static/add-point.html');
  const fixedPath = filePath.replace(/^\\/, '');
  res.sendFile(fixedPath, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('Error serving file:', err);
      res.status(500).send('Server error');
    }
  });
});

//add points api
router.post(
  '/add-point',
  async (req: Request, res: Response): Promise<void> => {
    const details = req.body;
    console.log(details);
    if (details) {
      res.status(201).send('All set');
    } else {
      res.status(500).send('No inputs recieved');
    }
  },
);

export default router;
