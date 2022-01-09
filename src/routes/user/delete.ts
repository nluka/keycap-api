import express from 'express';
import HTTP_STATUS from 'nluka-http-response-status-codes';
import database from '../../database';
import authenticateToken from '../../middleware/authenticateToken';
import HttpError from '../../utilities/HttpError';

const router = express.Router();

router.delete('/', authenticateToken, async (req, res, next) => {
  try {
    await database.userDelete(req.body.userId);
  } catch (err) {
    console.error(err);
    return next(new HttpError());
  }

  res.sendStatus(HTTP_STATUS.NO_CONTENT);
});

export default router;
