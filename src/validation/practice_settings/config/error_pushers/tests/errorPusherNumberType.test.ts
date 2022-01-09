import { afterEach, describe, expect, test } from '@jest/globals';
import errorPusherNumberType from '../errorPusherNumberType';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('errorPusherNumberType', () => {
  describe('should', () => {
    describe('push correct error when', () => {
      function assertPushesError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherNumberType('dummy', value, errors);
          expect(errors).toHaveLength(1);
          expect(errors[0]).toMatch('dummy');
          expect(errors[0]).toMatch('number');
        });
      }

      assertPushesError(true);
      assertPushesError(false);
      assertPushesError(null);
      assertPushesError(undefined);
      assertPushesError('string');
      assertPushesError({});
      assertPushesError([]);
    });

    describe('not push error when', () => {
      function assertDoesNotPushError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherNumberType('dummy', value, errors);
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError(123);
    });
  });
});
