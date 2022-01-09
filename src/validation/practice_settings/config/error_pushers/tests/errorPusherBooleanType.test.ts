import { afterEach, describe, expect, test } from '@jest/globals';
import errorPusherBooleanType from '../errorPusherBooleanType';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('errorPusherBooleanType', () => {
  describe('should', () => {
    describe('push correct error when', () => {
      function assertPushesError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherBooleanType('dummy', value, errors);
          expect(errors).toHaveLength(1);
          expect(errors[0]).toMatch('dummy');
          expect(errors[0]).toMatch('boolean');
        });
      }

      assertPushesError(null);
      assertPushesError(undefined);
      assertPushesError(123);
      assertPushesError('string');
      assertPushesError({});
      assertPushesError([]);
    });

    describe('not push error when', () => {
      function assertDoesNotPushError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherBooleanType('dummy', value, errors);
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError(true);
      assertDoesNotPushError(false);
    });
  });
});
