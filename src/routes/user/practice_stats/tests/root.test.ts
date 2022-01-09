import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { IPracticeRoundResult } from 'keycap-foundation';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import HTTP_STATUS from 'nluka-http-response-status-codes';
import request from 'supertest';
import app from '../../../../app';
import clearDatabase from '../../../../database/testing_utilities/clearDatabase';
import VALID_USER_DATA from '../../testSampleData';

let mongoMemServer: MongoMemoryServer;
let token: string | undefined;

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

const ROUTE = '/user/practice-stats';

describe(ROUTE, () => {
  const defaultAverageRoundResult: IPracticeRoundResult = {
    netWordsPerMinute: 0,
    accuracyPercentage: 0,
    timeElapsed: 0,
  };

  function assertionsTokenMissing(res: any) {
    expect(res.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0]).toMatch(/token/);
    expect(res.body.errors[0]).toMatch(/missing/);
  }

  function assertionsDefaultStats(res: any) {
    expect(res.statusCode).toBe(HTTP_STATUS.OK);
    expect(res.body.lastTenRoundResults).toEqual([]);
    expect(res.body.averageRoundResult).toEqual(defaultAverageRoundResult);
    expect(res.body.roundsCompletedCount).toBe(0);
    expect(res.body.roundsAbortedCount).toBe(0);
  }

  describe('GET', () => {
    test(`${HTTP_STATUS.BAD_REQUEST} and appropriate error when token header is missing`, async () => {
      await request(app)
        .get(ROUTE)
        .expect((res) => assertionsTokenMissing(res));
    });

    function assertFailure(
      token: any,
      expectedStatus: number,
      tokenValueDescription?: string,
    ) {
      test(`${expectedStatus} when token=${
        tokenValueDescription || JSON.stringify(token)
      }`, async () => {
        await request(app)
          .get(ROUTE)
          .set('token', token)
          .expect(expectedStatus);
      });
    }

    assertFailure('', HTTP_STATUS.FORBIDDEN);
    assertFailure('garbage', HTTP_STATUS.FORBIDDEN);

    test(`${HTTP_STATUS.OK} when token is valid`, async () => {
      if (token === undefined) {
        console.warn('token is undefined');
        return;
      }
      await request(app)
        .get(ROUTE)
        .set('token', token)
        .expect((res) => assertionsDefaultStats(res));
    });
  });

  describe('DELETE', () => {
    test(`${HTTP_STATUS.BAD_REQUEST} and appropriate error when token header is missing`, async () => {
      await request(app)
        .delete(ROUTE)
        .expect((res) => assertionsTokenMissing(res));
    });

    function assertFailure(
      token: any,
      expectedStatus: number,
      tokenValueDescription?: string,
    ) {
      test(`${expectedStatus} when token=${
        tokenValueDescription || JSON.stringify(token)
      }`, async () => {
        await request(app)
          .get(ROUTE)
          .set('token', token)
          .expect(expectedStatus);
      });
    }

    assertFailure('', HTTP_STATUS.FORBIDDEN);
    assertFailure('garbage', HTTP_STATUS.FORBIDDEN);

    test(`${HTTP_STATUS.OK} when token is valid`, async () => {
      expect(token).toBeDefined();
      if (token === undefined) {
        return;
      }
      await request(app)
        .delete(ROUTE)
        .set('token', token)
        .expect((res) => assertionsDefaultStats(res));
    });
  });
});
