import jwt from 'jsonwebtoken';
import { Request } from 'express';

const authenticateJWT = (req: Request) => {
  try {
    const authHeader = req.headers.cookie;
    const token = authHeader && authHeader.split('=')[1];
    if (!token) {
      return false;
    }
    const secretKey = process.env.JWT_SECRET_KEY;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const decoded = jwt.verify(token, secretKey);
    if (decoded) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export default authenticateJWT;
