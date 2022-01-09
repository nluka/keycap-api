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

const ROUTE = '/user/practice-stats/round-completion';

describe(ROUTE, () => {
  function assertionsTokenMissing(res: any) {
    expect(res.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0]).toMatch(/token/);
    expect(res.body.errors[0]).toMatch(/missing/);
  }

  describe('POST', () => {
    test(`${HTTP_STATUS.BAD_REQUEST} and appropriate error when token header is missing`, async () => {
      await request(app)
        .post(ROUTE)
        .expect((res) => assertionsTokenMissing(res));
    });

    function assertFailureToken(
      token: any,
      expectedStatus: number,
      tokenValueDescription?: string,
    ) {
      test(`${expectedStatus} when token=${
        tokenValueDescription || JSON.stringify(token)
      }`, async () => {
        await request(app)
          .post(ROUTE)
          .set('token', token)
          .expect(expectedStatus);
      });
    }

    assertFailureToken('', HTTP_STATUS.FORBIDDEN);
    assertFailureToken('garbage', HTTP_STATUS.FORBIDDEN);

    function assertSuccess(
      roundResult: IPracticeRoundResult,
      expectedLastTenRoundResults: IPracticeRoundResult[],
      expectedAverageRoundResult: IPracticeRoundResult,
      expectedRoundsCompletedCount: number,
      expectedRoundsAbortedCount: number,
    ) {
      test(`${HTTP_STATUS.OK} when roundResult=${JSON.stringify(
        roundResult,
      )}`, async () => {
        expect(token).toBeDefined();
        if (token === undefined) {
          return;
        }
        await request(app)
          .post(ROUTE)
          .set('token', token)
          .send({ roundResult })
          .expect((res) => {
            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.lastTenRoundResults).toEqual(
              expectedLastTenRoundResults,
            );
            expect(res.body.averageRoundResult).toEqual(
              expectedAverageRoundResult,
            );
            expect(res.body.roundsCompletedCount).toBe(
              expectedRoundsCompletedCount,
            );
            expect(res.body.roundsAbortedCount).toBe(
              expectedRoundsAbortedCount,
            );
          });
      });
    }

    {
      const averageRoundResult: IPracticeRoundResult = {
        netWordsPerMinute: 100,
        accuracyPercentage: 50,
        timeElapsed: 5000,
      };
      assertSuccess(
        averageRoundResult,
        [averageRoundResult],
        averageRoundResult,
        1,
        0,
      );
      assertSuccess(
        averageRoundResult,
        [averageRoundResult, averageRoundResult],
        averageRoundResult,
        2,
        0,
      );
      assertSuccess(
        averageRoundResult,
        [averageRoundResult, averageRoundResult, averageRoundResult],
        averageRoundResult,
        3,
        0,
      );
      assertSuccess(
        averageRoundResult,
        [
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
        ],
        averageRoundResult,
        4,
        0,
      );
      assertSuccess(
        averageRoundResult,
        [
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
        ],
        averageRoundResult,
        5,
        0,
      );
      assertSuccess(
        averageRoundResult,
        [
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
        ],
        averageRoundResult,
        6,
        0,
      );
      assertSuccess(
        averageRoundResult,
        [
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
        ],
        averageRoundResult,
        7,
        0,
      );
      assertSuccess(
        averageRoundResult,
        [
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
        ],
        averageRoundResult,
        8,
        0,
      );
      assertSuccess(
        averageRoundResult,
        [
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
        ],
        averageRoundResult,
        9,
        0,
      );
      const lowRoundResult: IPracticeRoundResult = {
        netWordsPerMinute: 90,
        accuracyPercentage: 40,
        timeElapsed: 4000,
      };
      assertSuccess(
        lowRoundResult,
        [
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          lowRoundResult,
        ],
        { netWordsPerMinute: 99, accuracyPercentage: 49, timeElapsed: 4900 },
        10,
        0,
      );
      const highRoundResult: IPracticeRoundResult = {
        netWordsPerMinute: 110,
        accuracyPercentage: 60,
        timeElapsed: 6000,
      };
      assertSuccess(
        highRoundResult,
        [
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          averageRoundResult,
          lowRoundResult,
          highRoundResult,
        ],
        averageRoundResult,
        11,
        0,
      );
    }
  });
});
