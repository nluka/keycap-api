import { afterEach, describe, expect, test } from '@jest/globals';
import errorPusherIsInstantDeathEnabled from '../errorPusherIsInstantDeathEnabled';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('errorPusherIsInstantDeathEnabled', () => {
  describe('should', () => {
    describe('push correct error when', () => {
      function assertPushesError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherIsInstantDeathEnabled(value, 'test', errors);
          expect(errors).toHaveLength(1);
          expect(errors[0]).toMatch('test.basic.config.isInstantDeathEnabled');
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
          errorPusherIsInstantDeathEnabled(value, 'test', errors);
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError(true);
      assertDoesNotPushError(false);
    });
  });
});
