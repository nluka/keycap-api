import express from 'express';
import HTTP_STATUS from 'nluka-http-response-status-codes';
import database from '../../../database';
import authenticateToken from '../../../middleware/authenticateToken';
import HttpError from '../../../utilities/HttpError';

const router = express.Router();

router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const newStats = await database.practiceStatsIncrementRoundsAbortedCount(
      req.body.userId,
    );
    res.status(HTTP_STATUS.OK).send(newStats);
  } catch (err) {
    console.error(err);
    return next(new HttpError());
  }
});

export default router;
