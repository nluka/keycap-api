import { afterEach, describe, expect, test } from '@jest/globals';
import errorPusherStringType from '../errorPusherStringType';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('errorPusherStringType', () => {
  describe('should', () => {
    describe('push correct error when', () => {
      function assertPushesError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherStringType('dummy', value, errors);
          expect(errors).toHaveLength(1);
          expect(errors[0]).toMatch('dummy');
          expect(errors[0]).toMatch('string');
        });
      }

      assertPushesError(true);
      assertPushesError(false);
      assertPushesError(null);
      assertPushesError(undefined);
      assertPushesError(123);
      assertPushesError({});
      assertPushesError([]);
    });

    describe('not push error when', () => {
      function assertDoesNotPushError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherStringType('dummy', value, errors);
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError('string');
    });
  });
});
