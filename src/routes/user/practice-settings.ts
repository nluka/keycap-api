import express from 'express';
import HTTP_STATUS from 'nluka-http-response-status-codes';
import database from '../../database';
import authenticateToken from '../../middleware/authenticateToken';
import HttpError from '../../utilities/HttpError';
import pushValidationErrorsPracticeSettingsCreate from '../../validation/practice_settings/pushValidationErrorsPracticeSettingsCreate';

const router = express.Router();

router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const settings = await database.practiceSettingsGet(req.body.userId);
    res.status(HTTP_STATUS.OK).json({ settings });
  } catch (err) {
    console.error(err);
    return next(new HttpError());
  }
});

router.put('/', authenticateToken, async (req, res, next) => {
  const validationErrors: string[] = [];
  pushValidationErrorsPracticeSettingsCreate(
    req.body.practiceSettings,
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
    await database.practiceSettingsReplace(
      req.body.userId,
      req.body.practiceSettings,
    );
    res.sendStatus(HTTP_STATUS.NO_CONTENT);
  } catch (err) {
    console.error(err);
    return next(new HttpError());
  }
});

export default router;
