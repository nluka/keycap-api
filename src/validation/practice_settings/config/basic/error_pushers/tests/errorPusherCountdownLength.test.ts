import { afterEach, describe, expect, test } from '@jest/globals';
import { PRACTICE_SETTINGS_COUNTDOWN_LENGTH_LIMITS } from 'keycap-foundation';
import errorPusherCountdownLength from '../errorPusherCountdownLength';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('errorPusherCountdownLength', () => {
  const limits = PRACTICE_SETTINGS_COUNTDOWN_LENGTH_LIMITS;
  const min = limits.getMin();
  const max = limits.getMax();

  describe('should', () => {
    describe('push correct error when', () => {
      function assertPushesError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherCountdownLength(value, 'test', errors);
          expect(errors).toHaveLength(1);
          expect(errors[0]).toMatch('test.basic.config.countdownLength');
          if (typeof value !== 'number') {
            expect(errors[0]).toMatch('number');
          } else {
            expect(errors[0]).toMatch(
              `[${limits.getMin()}, ${limits.getMax()}]`,
            );
          }
        });
      }

      assertPushesError(true);
      assertPushesError(false);
      assertPushesError(null);
      assertPushesError(undefined);
      assertPushesError('string');
      assertPushesError({});
      assertPushesError([]);
      assertPushesError(min - 1);
      assertPushesError(min - 0.01);
      assertPushesError(max + 0.01);
      assertPushesError(max + 1);
    });

    describe('NOT push error when', () => {
      function assertDoesNotPushError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherCountdownLength(value, 'test', errors);
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError(min);
      assertDoesNotPushError((min + max) / 2);
      assertDoesNotPushError(max);
    });
  });
});
