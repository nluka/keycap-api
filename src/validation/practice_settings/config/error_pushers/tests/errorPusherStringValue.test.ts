import { afterEach, describe, expect, test } from '@jest/globals';
import errorPusherStringValue from '../errorPusherStringValue';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('errorPusherStringValue', () => {
  describe('should', () => {
    const validValues = ['value1', 'value2'];

    describe('push correct error when', () => {
      function assertPushesError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherStringValue('dummy', value, validValues, errors);
          expect(errors).toHaveLength(1);
          expect(errors[0]).toMatch('dummy');
          expect(errors[0]).toMatch(
            validValues.map((val) => JSON.stringify(val)).join('|'),
          );
        });
      }

      assertPushesError(true);
      assertPushesError(false);
      assertPushesError(null);
      assertPushesError(undefined);
      assertPushesError(123);
      assertPushesError('123');
      assertPushesError('invalid');
      assertPushesError({});
      assertPushesError([]);
    });

    describe('NOT push error when', () => {
      function assertDoesNotPushError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherStringValue('dummy', value, validValues, errors);
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError('value1');
      assertDoesNotPushError('value2');
    });
  });
});
