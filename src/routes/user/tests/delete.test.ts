import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import HTTP_STATUS from 'nluka-http-response-status-codes';
import request from 'supertest';
import app from '../../../app';
import clearDatabase from '../../../database/testing_utilities/clearDatabase';
import VALID_USER_DATA from '../testSampleData';

const { username, password } = VALID_USER_DATA;
let token: string | undefined;
let mongoMemServer: MongoMemoryServer;

beforeAll(async () => {
  try {
    mongoMemServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoMemServer.getUri(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    await clearDatabase();
  } catch (err) {
    console.error(err);
  }

  await request(app)
    .post('/user/create')
    .send(VALID_USER_DATA)
    .expect((res) => {
      token = res.body.token;
    });
});

afterAll(async () => {
  try {
    await clearDatabase();
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoMemServer.stop();
  } catch (err) {
    console.error(err);
  }
});

test('user creation was successful', () => {
  expect(token).toBeDefined();
});

const ROUTE = '/user/delete';

describe(ROUTE, () => {
  describe('DELETE', () => {
    test(`${HTTP_STATUS.FORBIDDEN} when token is invalid`, async () => {
      await request(app)
        .delete(ROUTE)
        .set('token', 'invalid')
        .expect((res) => {
          expect(res.statusCode).toBe(HTTP_STATUS.FORBIDDEN);
        });
    });

    test(`${HTTP_STATUS.NO_CONTENT} when token is valid`, async () => {
      expect(token).toBeDefined();
      if (token === undefined) {
        return;
      }

      await request(app)
        .delete(ROUTE)
        .set('token', token)
        .expect(HTTP_STATUS.NO_CONTENT);

      // Check that user was deleted
      await request(app)
        .post('/user/sign-in')
        .send({
          username,
          password,
        })
        .expect(HTTP_STATUS.UNPROCESSABLE_ENTITY);
    });
  });
});
