import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
} from '@jest/globals';
import { PRACTICE_SETTINGS_MEDLEY_PUNCTUATION_FREQUENCY_LIMITS } from 'keycap-foundation';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import HTTP_STATUS from 'nluka-http-response-status-codes';
import request from 'supertest';
import app from '../../../app';
import clearDatabase from '../../../database/testing_utilities/clearDatabase';
import VALID_USER_DATA from '../testSampleData';
import getObjectLength from './getObjectLength';

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
});

afterEach(clearDatabase);

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

const ROUTE = '/user/create';

describe(ROUTE, () => {
  describe('POST', () => {
    function assertFailure(
      body: any,
      expectedStatus: number,
      expectedErrorCount: number,
      errorMatchers: string[],
      bodyValueDescription?: string,
    ) {
      test(`${expectedStatus} and correct errors when body=${
        bodyValueDescription || JSON.stringify(body)
      }`, async () => {
        await request(app)
          .post(ROUTE)
          .send(body)
          .expect((res) => {
            expect(res.statusCode).toBe(expectedStatus);
            const errors = res.body.errors;
            expect(errors).toHaveLength(expectedErrorCount);
            for (let i = 0; i < expectedErrorCount; ++i) {
              expect(errors[i]).toMatch(errorMatchers[i] as string);
            }
          });
      });
    }

    assertFailure({}, HTTP_STATUS.BAD_REQUEST, 3, [
      'username must be a string',
      'password must be a string',
      'practiceSettings must be an object',
    ]);
    assertFailure({ username: 123 }, HTTP_STATUS.BAD_REQUEST, 3, [
      'username must be a string',
      'password must be a string',
      'practiceSettings must be an object',
    ]);
    assertFailure({ username: '12' }, HTTP_STATUS.BAD_REQUEST, 4, [
      'username must be at least 3 characters long',
      'username must contain at least 1 letter',
      'password must be a string',
      'practiceSettings must be an object',
    ]);
    assertFailure(
      { ...VALID_USER_DATA, practiceSettings: {} },
      HTTP_STATUS.BAD_REQUEST,
      2,
      [
        'practiceSettings.currentConfig must be an object',
        'practiceSettings.profiles must be an array',
      ],
    );
    assertFailure(
      {
        ...VALID_USER_DATA,
        practiceSettings: {
          currentConfig: {
            basic: {
              config: {
                caretDelay: true,
                caretStyle: false,
                countdownLength: null,
                customTextActive: undefined,
                isInstantDeathEnabled: null,
                isKeyboardVisualEnabled: undefined,
                isPunctuationEnabled: 123,
                isResultRecordingEnabled: 'string',
                medleyCollectionsActive: {},
                medleyItemCount: undefined,
                medleyPunctuationFrequency:
                  PRACTICE_SETTINGS_MEDLEY_PUNCTUATION_FREQUENCY_LIMITS.getMax() +
                  1,
                mistakeHighlightStyle: 'invalid',
                quoteLength: [],
                soundVolume: {},
                textCasing: 123,
                textType: null,
              },
              pinned: {},
            },
            advanced: {
              config: 123,
              pinned: ['fakeSetting'],
            },
          },
          profiles: null,
        },
      },
      HTTP_STATUS.BAD_REQUEST,
      20,
      [
        'practiceSettings.currentConfig.basic.config.caretDelay must be a number',
        'practiceSettings.currentConfig.basic.config.caretStyle must be a string',
        'practiceSettings.currentConfig.basic.config.countdownLength must be a number',
        'practiceSettings.currentConfig.basic.config.customTextActive is required',
        'practiceSettings.currentConfig.basic.config.isInstantDeathEnabled must be a boolean',
        'practiceSettings.currentConfig.basic.config.isKeyboardVisualEnabled is required',
        'practiceSettings.currentConfig.basic.config.isPunctuationEnabled must be a boolean',
        'practiceSettings.currentConfig.basic.config.isResultRecordingEnabled must be a boolean',
        'practiceSettings.currentConfig.basic.config.medleyCollectionsActive must be an array of strings',
        'practiceSettings.currentConfig.basic.config.medleyItemCount is required',
        `practiceSettings.currentConfig.basic.config.medleyPunctuationFrequency must be in range [${PRACTICE_SETTINGS_MEDLEY_PUNCTUATION_FREQUENCY_LIMITS.getMin()}, ${PRACTICE_SETTINGS_MEDLEY_PUNCTUATION_FREQUENCY_LIMITS.getMax()}]`,
        'practiceSettings.currentConfig.basic.config.mistakeHighlightStyle must be "background"|"text"',
        'practiceSettings.currentConfig.basic.config.quoteLength must be an object',
        'practiceSettings.currentConfig.basic.config.soundVolume must be a number',
        'practiceSettings.currentConfig.basic.config.textCasing must be a string',
        'practiceSettings.currentConfig.basic.config.textType must be a string',
        'practiceSettings.currentConfig.basic.pinned must be an array of PracticeSettingNameBasic',
        'practiceSettings.currentConfig.advanced.config must be an object',
        'practiceSettings.currentConfig.advanced.pinned must be an array of PracticeSettingNameAdvanced',
        'practiceSettings.profiles must be an array',
      ],
      'valid except practiceSettings [1]',
    );
    assertFailure(
      {
        ...VALID_USER_DATA,
        practiceSettings: {
          currentConfig: VALID_USER_DATA.practiceSettings.currentConfig,
          profiles: [
            {
              name: null,
              config: VALID_USER_DATA.practiceSettings.currentConfig,
            },
            {
              name: '',
              config: VALID_USER_DATA.practiceSettings.currentConfig,
            },
            {
              name: '123456789_123456789_123456789_123',
              config: VALID_USER_DATA.practiceSettings.currentConfig,
            },
            {
              name: 'valid_profile_name',
              config: {
                basic: {
                  config: {
                    ...VALID_USER_DATA.practiceSettings.currentConfig.basic
                      .config,
                    caretDelay: null,
                  },
                  pinned: [],
                },
                advanced: {
                  config: {
                    ...VALID_USER_DATA.practiceSettings.currentConfig.advanced
                      .config,
                    customTexts: null,
                  },
                  pinned: [],
                },
              },
            },
          ],
        },
      },
      HTTP_STATUS.BAD_REQUEST,
      5,
      [
        'practiceSettings.profiles[0].name must be a string',
        'practiceSettings.profiles[1].name.length must be in range [1, 32]',
        'practiceSettings.profiles[2].name.length must be in range [1, 32]',
        'practiceSettings.profiles[3].config.basic.config.caretDelay must be a number',
        'practiceSettings.profiles[3].config.advanced.config.customTexts must be an array of IPracticeCustomText',
      ],
      'valid except practiceSettings [2]',
    );

    // TODO: write more comprehensive suite for failures

    test(`${HTTP_STATUS.CREATED} and correct body when request is valid`, async () => {
      await request(app)
        .post(ROUTE)
        .send(VALID_USER_DATA)
        .expect((res) => {
          expect(res.statusCode).toBe(HTTP_STATUS.CREATED);
          expect(getObjectLength(res.body)).toBe(3);
          expect(typeof res.body.id).toBe('string');
          expect(typeof res.body.name).toBe('string');
          expect(typeof res.body.token).toBe('string');
        });
    });
  });
});
