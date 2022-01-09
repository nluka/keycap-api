import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import {
  DEFAULT_PRACTICE_SETTINGS,
  PRACTICE_SETTINGS_MEDLEY_PUNCTUATION_FREQUENCY_LIMITS,
} from 'keycap-foundation';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import HTTP_STATUS from 'nluka-http-response-status-codes';
import request from 'supertest';
import app from '../../../app';
import clearDatabase from '../../../database/testing_utilities/clearDatabase';
import VALID_USER_DATA from '../testSampleData';

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

const ROUTE = '/user/practice-settings';

describe(ROUTE, () => {
  describe('PUT', () => {
    test(`${HTTP_STATUS.BAD_REQUEST} when token is missing from headers`, async () => {
      await request(app)
        .put(ROUTE)
        .send({
          settingName: 'textType',
          settingValue: 'quote',
        })
        .expect((res) => {
          expect(res.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
          expect(res.body.errors).toHaveLength(1);
          expect(res.body.errors[0]).toMatch(/token/);
        });
    });

    test(`${HTTP_STATUS.FORBIDDEN} when token is invalid`, async () => {
      await request(app)
        .put(ROUTE)
        .set('token', 'garbage')
        .send({
          settingName: 'textType',
          settingValue: 'quote',
        })
        .expect(HTTP_STATUS.FORBIDDEN);
    });

    function assertFailure(
      practiceSettings: any,
      expectedStatus: number,
      // expectedErrorCount: number,
      errorMatchers: string[],
      settingsValueDescription?: string,
    ) {
      test(`${expectedStatus} when practiceSettings=${
        settingsValueDescription || JSON.stringify(practiceSettings)
      }`, async () => {
        expect(token).toBeDefined();
        if (token === undefined) {
          return;
        }

        await request(app)
          .put(ROUTE)
          .set('token', token)
          .send({
            practiceSettings,
          })
          .expect((res) => {
            expect(res.statusCode).toBe(expectedStatus);
            expect(res.body.errors).toHaveLength(errorMatchers.length);
            for (let i = 0; i < errorMatchers.length; ++i) {
              expect(res.body.errors[i]).toMatch(errorMatchers[i] as string);
            }
          });
      });
    }

    assertFailure(undefined, HTTP_STATUS.BAD_REQUEST, [
      'practiceSettings must be an object',
    ]);
    assertFailure({}, HTTP_STATUS.BAD_REQUEST, [
      'practiceSettings.currentConfig must be an object',
      'practiceSettings.profiles must be an array',
    ]);
    assertFailure(
      {
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
        profiles: [
          {
            name: 'profile-1',
            config: { ...DEFAULT_PRACTICE_SETTINGS.currentConfig },
          },
          123,
          {
            name: 'profile-3',
            config: {
              basic: {
                config: {
                  ...DEFAULT_PRACTICE_SETTINGS.currentConfig.basic.config,
                  caretDelay: null,
                },
                pinned: {},
              },
              advanced: {
                config: {
                  ...DEFAULT_PRACTICE_SETTINGS.currentConfig.advanced.config,
                  customTexts: null,
                },
                pinned: 123,
              },
            },
          },
        ],
      },
      HTTP_STATUS.BAD_REQUEST,
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
        'practiceSettings.profiles[1].name must be a string',
        'practiceSettings.profiles[1].config must be an object',
        'practiceSettings.profiles[2].config.basic.config.caretDelay must be a number',
        'practiceSettings.profiles[2].config.basic.pinned must be an array of PracticeSettingNameBasic',
        'practiceSettings.profiles[2].config.advanced.config.customTexts must be an array of IPracticeCustomText',
        'practiceSettings.profiles[2].config.advanced.pinned must be an array of PracticeSettingNameAdvanced',
      ],
      'invalid',
    );

    test(`${HTTP_STATUS.NO_CONTENT} when practiceSettings is valid`, async () => {
      expect(token).toBeDefined();
      if (token === undefined) {
        return;
      }
      await request(app)
        .put(ROUTE)
        .set('token', token)
        .send({
          practiceSettings: DEFAULT_PRACTICE_SETTINGS,
        })
        .expect((res) => {
          expect(res.statusCode).toBe(HTTP_STATUS.NO_CONTENT);
        });
    });
  });
});
