import express from 'express';
import HTTP_STATUS from 'nluka-http-response-status-codes';
import database from '../../../database';
import authenticateToken from '../../../middleware/authenticateToken';
import HttpError from '../../../utilities/HttpError';

const router = express.Router();

router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const practiceStats = await database.practiceStatsGet(req.body.userId);
    res.status(HTTP_STATUS.OK).json({ ...practiceStats });
  } catch (err) {
    console.error(err);
    return next(new HttpError());
  }
});

router.delete('/', authenticateToken, async (req, res, next) => {
  try {
    const resetStats = await database.practiceStatsReset(req.body.userId);
    res.status(HTTP_STATUS.OK).json({ ...resetStats });
  } catch (err) {
    console.error(err);
    return next(new HttpError());
  }
});

export default router;
