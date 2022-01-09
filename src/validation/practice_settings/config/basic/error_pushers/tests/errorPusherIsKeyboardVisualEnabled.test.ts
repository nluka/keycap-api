import { afterEach, describe, expect, test } from '@jest/globals';
import errorPusherIsKeyboardVisualEnabled from '../errorPusherIsKeyboardVisualEnabled';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('errorPusherIsKeyboardVisualEnabled', () => {
  describe('should', () => {
    describe('push correct error when', () => {
      function assertPushesError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherIsKeyboardVisualEnabled(value, 'test', errors);
          expect(errors).toHaveLength(1);
          expect(errors[0]).toMatch(
            'test.basic.config.isKeyboardVisualEnabled',
          );
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
          errorPusherIsKeyboardVisualEnabled(value, 'test', errors);
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError(true);
      assertDoesNotPushError(false);
    });
  });
});
