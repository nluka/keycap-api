import { afterEach, describe, expect, test } from '@jest/globals';
import errorPusherCustomTextActive from '../errorPusherCustomTextActive';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('errorPusherCustomTextActive', () => {
  describe('should', () => {
    describe('push correct error when', () => {
      function assertPushesError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherCustomTextActive(value, 'test', errors);
          expect(errors).toHaveLength(1);
          expect(errors[0]).toMatch('test.basic.config.customTextActive');
          if (typeof value !== 'string' && value !== null) {
            expect(errors[0]).toMatch('string');
          } else {
            expect(errors[0]).toMatch('string or null');
          }
        });
      }

      assertPushesError(true);
      assertPushesError(false);
      assertPushesError(undefined);
      assertPushesError(123);
      assertPushesError({});
      assertPushesError([]);
    });

    describe('NOT push error when', () => {
      function assertDoesNotPushError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherCustomTextActive(value, 'test', errors);
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError('string');
      assertDoesNotPushError(null);
    });
  });
});
