import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import HTTP_STATUS from 'nluka-http-response-status-codes';
import request from 'supertest';
import app from '../../../app';
import clearDatabase from '../../../database/testing_utilities/clearDatabase';
import VALID_USER_DATA from '../testSampleData';
import getObjectLength from './getObjectLength';

const { username, password, practiceSettings } = VALID_USER_DATA;
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
    .send({
      username,
      password,
      practiceSettings,
    })
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

const ROUTE = '/user/sign-in';

describe(ROUTE, () => {
  describe('POST', () => {
    test(`${HTTP_STATUS.BAD_REQUEST} and appropriate errors when username and password are missing`, async () => {
      await request(app)
        .post(ROUTE)
        .send({})
        .expect((res) => {
          expect(res.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
          expect(res.body.errors).toHaveLength(2);
          expect(res.body.errors[0]).toMatch('username must be a string');
          expect(res.body.errors[1]).toMatch('password must be a string');
        });
    });

    function assertFailure(
      body: any,
      errorMatchers: string[],
      description: string,
    ) {
      test(`${HTTP_STATUS.BAD_REQUEST} and appropriate error when ${description}`, async () => {
        await request(app)
          .post(ROUTE)
          .send(body)
          .expect((res) => {
            expect(res.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
            expect(res.body.errors).toHaveLength(1);
            for (const matcher of errorMatchers) {
              expect(res.body.errors[0]).toMatch(matcher);
            }
          });
      });
    }

    assertFailure(
      { password },
      ['username must be a string'],
      'username is missing',
    );
    assertFailure(
      { username },
      ['password must be a string'],
      'password is missing',
    );
    assertFailure(
      {
        username: 123,
        password,
      },
      ['username must be a string'],
      'username is not a string',
    );
    assertFailure(
      {
        username,
        password: 123,
      },
      ['password must be a string'],
      'password is not a string',
    );

    test(`${HTTP_STATUS.OK} and correct body when username and password are correct`, async () => {
      await request(app)
        .post(ROUTE)
        .send({
          username,
          password,
        })
        .expect((res) => {
          expect(res.statusCode).toBe(HTTP_STATUS.OK);
          expect(getObjectLength(res.body)).toBe(4);
          expect(typeof res.body.id).toBe('string');
          expect(typeof res.body.name).toBe('string');
          expect(typeof res.body.token).toBe('string');
          expect(typeof res.body.practiceSettings).toBe('object');
        });
    });
  });
});
