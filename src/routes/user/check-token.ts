import express, { Request, Response } from 'express';
import HTTP_STATUS from 'nluka-http-response-status-codes';
import authenticateToken from '../../middleware/authenticateToken';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  // @ts-ignore
  (req: Request, res: Response) => {
    res.sendStatus(HTTP_STATUS.NO_CONTENT);
  },
);

export default router;
