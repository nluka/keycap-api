import { NextFunction, Request, Response } from 'express';
import HttpError from '../utilities/HttpError';

/**
 * Middleware that sends error response to client.
 * @param {HttpError} err The error object to report to client.
 * @param {express.Request} req The request object given by Express.
 * @param {express.Response} res The response object given by Express.
 */
// eslint-disable-next-line no-unused-vars
export default function handleError(
  err: HttpError,
  // @ts-ignore
  req: Request,
  res: Response,
  // @ts-ignore
  next: NextFunction,
) {
  res.status(err.statusCode).json(err.data);
}
