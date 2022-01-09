import express from 'express';
import HTTP_STATUS from 'nluka-http-response-status-codes';
import database, { ISignInResult, SignInStatus } from '../../database';
import createJsonWebToken from '../../utilities/createJsonWebToken';
import HttpError from '../../utilities/HttpError';
import pushValidationErrorsUserSignIn from '../../validation/user/pushValidationErrorsUserSignIn';

const router = express.Router();

router.post('/', async (req, res, next) => {
  const validationErrors: string[] = [];
  pushValidationErrorsUserSignIn(req.body, validationErrors);
  if (validationErrors.length > 0) {
    return next(
      new HttpError(HTTP_STATUS.BAD_REQUEST, {
        errors: validationErrors,
      }),
    );
  }

  let result: ISignInResult;
  try {
    result = await database.userSignIn(
      req.body.username.trim(),
      req.body.password,
    );
  } catch (err) {
    console.error(err);
    return next(new HttpError());
  }

  if (
    result.status === SignInStatus.FailedUsernameNotFound ||
    result.status === SignInStatus.FailedInvalidCredentials
  ) {
    return next(
      new HttpError(HTTP_STATUS.UNPROCESSABLE_ENTITY, {
        errors: ['invalid credentials'],
      }),
    );
  }

  if (result.data === undefined) {
    console.error('sign in was successful but result.data is undefined');
    return next(new HttpError());
  }
  res
    .status(HTTP_STATUS.OK)
    .json({ ...result.data, token: createJsonWebToken(result.data.id) });
});

export default router;
