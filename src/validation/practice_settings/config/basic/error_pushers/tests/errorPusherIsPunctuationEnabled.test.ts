import { afterEach, describe, expect, test } from '@jest/globals';
import errorPusherIsPunctuationEnabled from '../errorPusherIsPunctuationEnabled';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('errorPusherIsPunctuationEnabled', () => {
  describe('should', () => {
    describe('push correct error when', () => {
      function assertPushesError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherIsPunctuationEnabled(value, 'test', errors);
          expect(errors).toHaveLength(1);
          expect(errors[0]).toMatch('test.basic.config.isPunctuationEnabled');
          expect(errors[0]).toMatch('boolean');
        });
      }

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
          errorPusherIsPunctuationEnabled(value, 'test', errors);
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError(true);
      assertDoesNotPushError(false);
    });
  });
});
