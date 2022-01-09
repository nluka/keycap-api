import express from 'express';
import HTTP_STATUS from 'nluka-http-response-status-codes';
import database from '../../database';
import createJsonWebToken from '../../utilities/createJsonWebToken';
import HttpError from '../../utilities/HttpError';
import { pushValidationErrorsUserCreate } from '../../validation/user/pushValidationErrorsUserCreate';

const router = express.Router();

router.post('/', async (req, res, next) => {
  const validationErrors: string[] = [];
  pushValidationErrorsUserCreate(req.body, validationErrors);
  if (validationErrors.length > 0) {
    return next(
      new HttpError(HTTP_STATUS.BAD_REQUEST, {
        errors: validationErrors,
      }),
    );
  }

  try {
    const doesUsernameExist = await database.userDoesNameExist(
      req.body.username,
    );
    if (doesUsernameExist) {
      return next(
        new HttpError(HTTP_STATUS.CONFLICT, {
          errors: ['username taken'],
        }),
      );
    }
  } catch (err) {
    console.error(err);
    return next(new HttpError());
  }

  try {
    const user = await database.userCreate(
      req.body.username,
      req.body.password,
      req.body.practiceSettings,
    );
    res
      .status(HTTP_STATUS.CREATED)
      .send({ ...user, token: createJsonWebToken(user.id) });
  } catch (err) {
    console.error(err);
    return next(new HttpError());
  }
});

export default router;
