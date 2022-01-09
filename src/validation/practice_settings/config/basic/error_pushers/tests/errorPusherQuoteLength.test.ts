import { afterEach, describe, expect, test } from '@jest/globals';
import { PRACTICE_SETTINGS_QUOTE_LENGTH_LIMITS } from 'keycap-foundation';
import errorPusherQuoteLength from '../errorPusherQuoteLength';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('errorPusherQuoteLength', () => {
  const limits = PRACTICE_SETTINGS_QUOTE_LENGTH_LIMITS;
  const min = limits.getMin();
  const max = limits.getMax();

  describe('should', () => {
    describe('push correct error when', () => {
      function assertPushesError(value: any, errorMatcher: string) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherQuoteLength(value, 'test', errors);
          expect(errors).toHaveLength(1);
          expect(errors[0]).toMatch('test.basic.config.quoteLength');
          expect(errors[0]).toMatch(errorMatcher);
        });
      }

      assertPushesError(true, 'must be an object');
      assertPushesError(false, 'must be an object');
      assertPushesError(undefined, 'must be an object');
      assertPushesError(123, 'must be an object');
      assertPushesError('string', 'must be an object');
      assertPushesError({}, 'min must be a number');
      assertPushesError({ min }, 'max must be a number');
      assertPushesError({ max }, 'min must be a number');
      assertPushesError({ min, max: '123' }, 'max must be a number');
      assertPushesError({ min: '123', max }, 'min must be a number');
      assertPushesError({ min: min - 1, max: max }, '');
      assertPushesError({ min: min, max: max + 1 }, '');
      assertPushesError(
        { min: (min + max) / 2, max: min },
        'min cannot be greater',
      );
    });

    describe('NOT push error when', () => {
      function assertDoesNotPushError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherQuoteLength(value, 'test', errors);
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError({ min, max });
    });
  });
});
