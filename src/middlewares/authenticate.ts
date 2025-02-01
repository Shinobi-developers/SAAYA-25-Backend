import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Not authorized' });
  }
  const secretKey = process.env.JWT_SECRET_KEY;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const decoded = jwt.verify(token, secretKey);
  if (!decoded) {
    res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

export default authenticateJWT;
