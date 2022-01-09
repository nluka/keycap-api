import { afterEach, describe, expect, test } from '@jest/globals';
import {
  createDeepCopy,
  DEFAULT_PRACTICE_SETTINGS,
  PRACTICE_SETTINGS_CARET_DELAY_LIMITS,
} from 'keycap-foundation';
import pushValidationErrorsPracticeSettingsBasicConfig from '../pushValidationErrorsPracticeSettingsBasicConfig';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('pushValidationErrorsPracticeSettingsBasicConfig', () => {
  describe('should', () => {
    describe('push correct error when', () => {
      function assertPushesErrors(
        basic: any,
        expectedErrorCount: number,
        errorMatchers: string[],
        basicValueDescription?: string,
      ) {
        test(`basic=${basicValueDescription || JSON.stringify(basic)}`, () => {
          pushValidationErrorsPracticeSettingsBasicConfig(
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

      assertPushesErrors(true, 1, ['test.basic.config must be an object']);
      assertPushesErrors(false, 1, ['test.basic.config must be an object']);
      assertPushesErrors(undefined, 1, ['test.basic.config must be an object']);
      assertPushesErrors(123, 1, ['test.basic.config must be an object']);
      assertPushesErrors('string', 1, ['test.basic.config must be an object']);
      assertPushesErrors([], 1, ['test.basic.config must be an object']);

      {
        const config = createDeepCopy(
          DEFAULT_PRACTICE_SETTINGS.currentConfig.basic.config,
        );
        delete config.caretDelay;
        assertPushesErrors(
          config,
          1,
          ['test.basic.config.caretDelay is required'],
          ' DEFAULT_PRACTICE_SETTINGS.currentConfig.basic.config, caretDelay missing',
        );
      }

      {
        const config = createDeepCopy(
          DEFAULT_PRACTICE_SETTINGS.currentConfig.basic.config,
        );
        config.caretDelay = config.caretDelay.toString();
        assertPushesErrors(
          config,
          1,
          ['test.basic.config.caretDelay must be a number'],
          'DEFAULT_PRACTICE_SETTINGS.currentConfig.basic.config, caretDelay not a number',
        );
      }

      {
        const config = createDeepCopy(
          DEFAULT_PRACTICE_SETTINGS.currentConfig.basic.config,
        );
        config.caretDelay = PRACTICE_SETTINGS_CARET_DELAY_LIMITS.getMax() + 1;
        assertPushesErrors(
          config,
          1,
          ['test.basic.config.caretDelay'],
          'DEFAULT_PRACTICE_SETTINGS.currentConfig.basic.config, caretDelay > max',
        );
      }
    });

    describe('NOT push error when', () => {
      function assertDoesNotPushError(
        basic: any,
        basicValueDescription?: string,
      ) {
        test(`basic=${basicValueDescription || JSON.stringify(basic)}`, () => {
          pushValidationErrorsPracticeSettingsBasicConfig(
            basic,
            'test',
            errors,
          );
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError(
        DEFAULT_PRACTICE_SETTINGS.currentConfig.basic.config,
        'DEFAULT_PRACTICE_SETTINGS.currentConfig.basic',
      );
    });
  });
});
