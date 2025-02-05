import express from 'express';
import { Request, Response } from 'express';
import Squad from '../models/squad';

const router = express.Router();

// get points of all squads
// /squad/points
router.get('/points', async (req: Request, res: Response) => {
  try {
    const points = await Squad.find({});
    const squads: {
      squad: string;
      department: string;
      points: number;
    }[] = [
      {
        squad: 'Slytherin',
        department: 'CSE',
        points: points[0].CSE,
      },
      {
        squad: 'Gryffindor',
        department: 'CE & AD',
        points: points[0].CE_AD,
      },
      {
        squad: 'Hufflepuff',
        department: 'ECE, EEE & ME',
        points: points[0].EEE_ECE_ME,
      },
      {
        squad: 'Ravenclaw',
        department: 'MCA & MTECH',
        points: points[0].MCA_MTECH,
      },
    ];
    const sortedSquads = squads.sort((a, b) => b.points - a.points);
    res.status(200).send(sortedSquads);
  } catch {
    res.status(500).send({
      status: false,
      message: 'Something went wrong.',
    });
  }
});

export default router;
