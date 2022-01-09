import express from 'express';
import HTTP_STATUS from 'nluka-http-response-status-codes';
import database from '../../../database';
import authenticateToken from '../../../middleware/authenticateToken';
import HttpError from '../../../utilities/HttpError';
import pushValidationErrorsPracticeStatsUpdate from '../../../validation/practice_stats/pushValidationErrorsPracticeStatsUpdate';

const router = express.Router();

router.post('/', authenticateToken, async (req, res, next) => {
  const validationErrors: string[] = [];
  pushValidationErrorsPracticeStatsUpdate(
    req.body.roundResult,
    validationErrors,
  );
  if (validationErrors.length > 0) {
    return next(
      new HttpError(HTTP_STATUS.BAD_REQUEST, {
        errors: validationErrors,
      }),
    );
  }

  try {
    const newStats = await database.practiceStatsPushRoundResult(
      req.body.userId,
      req.body.roundResult,
    );
    res.status(HTTP_STATUS.OK).send(newStats);
  } catch (err) {
    console.error(err);
    return next(new HttpError());
  }
});

export default router;
