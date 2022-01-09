import { afterEach, describe, expect, test } from '@jest/globals';
import pushValidationErrorsUserPassword from '../pushValidationErrorsUserPassword';
let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('pushValidationErrorsUserPassword', () => {
  describe('should push correct error when', () => {
    function assertPushesErrors(password: any, errorMatchers: string[]) {
      test(`password=${password}`, () => {
        pushValidationErrorsUserPassword(password, errors);
        expect(errors).toHaveLength(errorMatchers.length);
        for (let i = 0; i < errors.length; ++i) {
          expect(errors[i]).toMatch(errorMatchers[i] as string);
        }
      });
    }

    assertPushesErrors(true, ['password must be a string']);
    assertPushesErrors(false, ['password must be a string']);
    assertPushesErrors(null, ['password must be a string']);
    assertPushesErrors(undefined, ['password must be a string']);
    assertPushesErrors(123, ['password must be a string']);
    assertPushesErrors({}, ['password must be a string']);
    assertPushesErrors([], ['password must be a string']);

    assertPushesErrors('a', ['password must be at least 8 characters long']);
    assertPushesErrors('abc', ['password must be at least 8 characters long']);
    assertPushesErrors('abcdefg', [
      'password must be at least 8 characters long',
    ]);

    assertPushesErrors(
      '123456789_123456789_123456789_123456789_123456789_123456789_abcde',
      ['password must be no longer than 64 characters'],
    );
    assertPushesErrors(
      '123456789_123456789_123456789_123456789_123456789_123456789_abcdefg',
      ['password must be no longer than 64 characters'],
    );

    assertPushesErrors('12345678', ['password must contain at least 1 letter']);

    assertPushesErrors('123', [
      'password must be at least 8 characters long',
      'password must contain at least 1 letter',
    ]);
  });

  describe('should NOT push any errors when', () => {
    function assertDoesNotPushErrors(password: string) {
      test(`password=${password}`, () => {
        pushValidationErrorsUserPassword(password, errors);
        expect(errors).toHaveLength(0);
      });
    }

    assertDoesNotPushErrors('v@lidpass123');
  });
});
