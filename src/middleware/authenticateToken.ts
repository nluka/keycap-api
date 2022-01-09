import { NextFunction, Request, Response } from 'express';
import jsonWebToken from 'jsonwebtoken';
import HTTP_STATUS from 'nluka-http-response-status-codes';
import { ITokenPayload } from '../utilities/createJsonWebToken';
import HttpError from '../utilities/HttpError';
import isEnvironmentProduction from '../utilities/isEnvironmentProduction';

if (!isEnvironmentProduction()) {
  require('dotenv').config();
}

export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers['token'];
  if (token == null) {
    return next(
      new HttpError(HTTP_STATUS.BAD_REQUEST, {
        errors: ['token is missing from headers'],
      }),
    );
  }
  if (typeof token !== 'string') {
    return next(
      new HttpError(HTTP_STATUS.BAD_REQUEST, {
        errors: ['token must be a string'],
      }),
    );
  }

  const secret = process.env['JSON_WEB_TOKEN_SECRET'] || 'placeholder-secret';
  if (secret == null) {
    console.warn(
      `process.env.JSON_WEB_TOKEN_SECRET is ${secret}: this is normal when running tests without a .env file`,
    );
  }

  try {
    const decoded = jsonWebToken.verify(token, secret);
    req.body.userId = (decoded as ITokenPayload).user.id;
  } catch (err) {
    return res.sendStatus(HTTP_STATUS.FORBIDDEN);
  }

  next();
}
