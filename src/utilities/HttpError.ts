import { IServerResponseDataError } from 'keycap-foundation';
import HTTP_STATUS from 'nluka-http-response-status-codes';

export default class HttpError {
  public readonly statusCode: number;
  public readonly data: IServerResponseDataError;

  constructor(
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    data: IServerResponseDataError = {
      errors: ['internal server error'],
    },
  ) {
    this.statusCode = statusCode;
    this.data = data;
  }
}
