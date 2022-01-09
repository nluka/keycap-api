import { afterEach, describe, expect, test } from '@jest/globals';
import errorPusherMistakeHighlightStyle from '../errorPusherMistakeHighlightStyle';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('errorPusherMistakeHighlightStyle', () => {
  const validValues = ['background', 'text'];

  describe('should', () => {
    describe('push correct error when', () => {
      function assertPushesError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherMistakeHighlightStyle(value, 'test', errors);
          expect(errors).toHaveLength(1);
          expect(errors[0]).toMatch('test.basic.config.mistakeHighlightStyle');
          if (typeof value !== 'string') {
            expect(errors[0]).toMatch('string');
          } else {
            expect(errors[0]).toMatch(
              validValues.map((val) => JSON.stringify(val)).join('|'),
            );
          }
        });
      }

      assertPushesError(true);
      assertPushesError(false);
      assertPushesError(null);
      assertPushesError(undefined);
      assertPushesError(123);
      assertPushesError('invalid');
      assertPushesError({});
      assertPushesError([]);
    });

    describe('NOT push error when', () => {
      function assertDoesNotPushError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherMistakeHighlightStyle(value, 'test', errors);
          expect(errors).toHaveLength(0);
        });
      }

      for (const val of validValues) {
        assertDoesNotPushError(val);
      }
    });
  });
});
