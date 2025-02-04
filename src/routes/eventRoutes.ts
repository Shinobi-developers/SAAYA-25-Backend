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

// Add points page
// /event/page/add-point
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
// /event/add-point
router.post(
  '/add-point',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const eventDetails = req.body;
      if (!eventDetails) {
        res.status(404).send({
          status: false,
          message: 'Event details cannot be empty',
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

      const fsd = [];
      if (event.first?.name !== '') {
        fsd.push(event.first);
      }
      if (event.second?.name !== '') {
        fsd.push(event.second);
      }
      if (event.third?.name !== '') {
        fsd.push(event.third);
      }
      fsd.map((e) => {
        if (e) {
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
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      res.status(500).send({
        status: false,
        message: 'Something went wrong.',
      });
    }
  },
);

// get all events results
// /event/all
router.get('/all', async (req: Request, res: Response) => {
  try {
    const filter = {};

    // event type filter
    if (req.query.eventType) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      filter.eventType = req.query.eventType;
    }

    // squad filter
    if (req.query.squad) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      filter.$or = [
        { 'first.squad': req.query.squad },
        { 'second.squad': req.query.squad },
        { 'third.squad': req.query.squad },
      ];
    }

    // sem filter
    if (req.query.sem) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      filter.$or = [
        { 'first.sem': req.query.sem },
        { 'second.sem': req.query.sem },
        { 'third.sem': req.query.sem },
      ];
    }

    const events = await Event.find(filter);
    res.status(200).send(events);
  } catch {
    res.status(500).send({
      status: false,
      message: 'Something went wrong.',
    });
  }
});

export default router;
