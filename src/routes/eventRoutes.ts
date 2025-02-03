import express from 'express';
import { Request, Response } from 'express';
import path from 'path';
import authenticateJWT from '../middlewares/authenticate';
import Squad from '../models/squad';
import Event from '../models/event';

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
    try {
      const eventDetails = req.body;
      if (!eventDetails) {
        res.status(404).send({
          status: false,
          message: 'Enent details cannot be empty',
        });
      }
      const existingSquad = await Squad.findOne({});
      if (!existingSquad) {
        await Squad.findOneAndUpdate(
          {},
          { $setOnInsert: { CSE: 0, CE_AD: 0, EEE_ECE_ME: 0, MCA_MTECH: 0 } },
          { new: true, upsert: true },
        );
      }
      const squad = {
        CSE: existingSquad?.CSE,
        CE_AD: existingSquad?.CE_AD,
        EEE_ECE_ME: existingSquad?.EEE_ECE_ME,
        MCA_MTECH: existingSquad?.MCA_MTECH,
      };
      const event = new Event(eventDetails);
      await event.save();
      const fsd = [event.first, event.second, event.third];
      fsd.map((e) => {
        if (e?.squad == 'CSE') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          squad.CSE += e.point;
        } else if (e?.squad == 'CE_AD') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          squad.CE_AD += e.point;
        } else if (e?.squad == 'EEE_ECE_ME') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          squad.EEE_ECE_ME += e.point;
        } else if (e?.squad == 'MCA_MTECH') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          squad.MCA_MTECH += e.point;
        }
      });
      await Squad.findOneAndUpdate(
        {},
        {
          $set: squad,
        },
        { new: true },
      );
      res.status(200).send({
        status: true,
        message: 'Squad points updated successfully',
      });
    } catch {
      res.status(500).send({
        status: false,
        message: 'Something went wrong.',
      });
    }
  },
);

export default router;
