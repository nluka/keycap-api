import { afterEach, describe, expect, test } from '@jest/globals';
import NumberRange from 'nluka-number-range';
import errorPusherNumberValue from '../errorPusherNumberValue';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('errorPusherNumberValue', () => {
  describe('should', () => {
    const limits = new NumberRange(0, 2);

    describe('push correct error when', () => {
      function assertPushesError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherNumberValue('dummy', value, limits, errors);
          expect(errors).toHaveLength(1);
          expect(errors[0]).toMatch('dummy');
          expect(errors[0]).toMatch(`[${limits.getMin()}, ${limits.getMax()}]`);
        });
      }

      assertPushesError(-123);
      assertPushesError(-0.01);
      assertPushesError(2.01);
      assertPushesError(123);
    });

    describe('NOT push error when', () => {
      function assertDoesNotPushError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherNumberValue('dummy', value, limits, errors);
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError(0);
      assertDoesNotPushError(0.5);
      assertDoesNotPushError(1);
      assertDoesNotPushError(1.5);
      assertDoesNotPushError(2);
    });
  });
});
