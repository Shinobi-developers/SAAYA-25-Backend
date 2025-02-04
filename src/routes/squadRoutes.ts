import express from 'express';
import { Request, Response } from 'express';
import Squad from '../models/squad';

const router = express.Router();

// get points of all squads
// /squad/points
router.get('/points', async (req: Request, res: Response) => {
  try {
    const points = await Squad.find({});
    res.status(200).send({
      CSE: points[0].CSE,
      CE_AD: points[0].CE_AD,
      EEE_ECE_ME: points[0].EEE_ECE_ME,
      MCA_MTECH: points[0].MCA_MTECH,
    });
  } catch {
    res.status(500).send({
      status: false,
      message: 'Something went wrong.',
    });
  }
});

export default router;
