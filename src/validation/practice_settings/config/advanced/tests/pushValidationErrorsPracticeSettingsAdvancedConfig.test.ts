import { afterEach, describe, expect, test } from '@jest/globals';
import { createDeepCopy, DEFAULT_PRACTICE_SETTINGS } from 'keycap-foundation';
import pushValidationErrorsPracticeSettingsAdvancedConfig from '../pushValidationErrorsPracticeSettingsAdvancedConfig';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('pushValidationErrorsPracticeSettingsAdvancedConfig', () => {
  describe('should', () => {
    describe('push correct error when', () => {
      function assertPushesErrors(
        basic: any,
        expectedErrorCount: number,
        errorMatchers: string[],
        basicValueDescription?: string,
      ) {
        test(`basic=${basicValueDescription || JSON.stringify(basic)}`, () => {
          pushValidationErrorsPracticeSettingsAdvancedConfig(
            basic,
            'test',
            errors,
          );

          expect(errors).toHaveLength(expectedErrorCount);
          if (errors.length !== expectedErrorCount) {
            return;
          }

          for (let i = 0; i < errors.length; ++i) {
            const err = errors[i];
            const matcher = errorMatchers[i] as string;
            expect(err).toMatch(matcher);
          }
        });
      }

      assertPushesErrors(true, 1, ['test.advanced.config must be an object']);
      assertPushesErrors(false, 1, ['test.advanced.config must be an object']);
      assertPushesErrors(undefined, 1, [
        'test.advanced.config must be an object',
      ]);
      assertPushesErrors(123, 1, ['test.advanced.config must be an object']);
      assertPushesErrors('string', 1, [
        'test.advanced.config must be an object',
      ]);
      assertPushesErrors([], 1, ['test.advanced.config must be an object']);

      {
        const config = createDeepCopy(
          DEFAULT_PRACTICE_SETTINGS.currentConfig.advanced.config,
        );
        delete config.customTexts;
        assertPushesErrors(
          config,
          1,
          ['test.advanced.config.customTexts is required'],
          'DEFAULT_PRACTICE_SETTINGS.currentConfig.advanced.config, customTexts is missing',
        );
      }

      {
        const config = createDeepCopy(
          DEFAULT_PRACTICE_SETTINGS.currentConfig.advanced.config,
        );
        delete config.medleyCollectionsCustom;
        assertPushesErrors(
          config,
          1,
          ['test.advanced.config.medleyCollectionsCustom is required'],
          'DEFAULT_PRACTICE_SETTINGS.currentConfig.advanced.config, medleyCollectionsCustom is missing',
        );
      }
    });

    describe('NOT push error when', () => {
      function assertDoesNotPushError(
        basic: any,
        basicValueDescription?: string,
      ) {
        test(`basic=${basicValueDescription || JSON.stringify(basic)}`, () => {
          pushValidationErrorsPracticeSettingsAdvancedConfig(
            basic,
            'test',
            errors,
          );
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError(
        DEFAULT_PRACTICE_SETTINGS.currentConfig.advanced.config,
        'DEFAULT_PRACTICE_SETTINGS.currentConfig.advanced.config',
      );
    });
  });
});
