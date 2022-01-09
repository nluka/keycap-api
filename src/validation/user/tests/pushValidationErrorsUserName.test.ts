import { afterEach, describe, expect, test } from '@jest/globals';
import pushValidationErrorsUserName from '../pushValidationErrorsUserName';
let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('pushValidationErrorsUserName', () => {
  describe('should push correct error when', () => {
    function assertPushesErrors(username: any, errorMatchers: string[]) {
      test(`username=${username}`, () => {
        pushValidationErrorsUserName(username, errors);
        expect(errors).toHaveLength(errorMatchers.length);
        for (let i = 0; i < errors.length; ++i) {
          expect(errors[i]).toMatch(errorMatchers[i] as string);
        }
      });
    }

    assertPushesErrors(true, ['username must be a string']);
    assertPushesErrors(false, ['username must be a string']);
    assertPushesErrors(null, ['username must be a string']);
    assertPushesErrors(undefined, ['username must be a string']);
    assertPushesErrors(123, ['username must be a string']);
    assertPushesErrors({}, ['username must be a string']);
    assertPushesErrors([], ['username must be a string']);

    assertPushesErrors('a', ['username must be at least 3 characters long']);
    assertPushesErrors('ab', ['username must be at least 3 characters long']);

    assertPushesErrors('123456789_123456789_123456789_abc', [
      'username must be no longer than 32 characters',
    ]);
    assertPushesErrors('123456789_123456789_123456789_abcd', [
      'username must be no longer than 32 characters',
    ]);

    assertPushesErrors('12345', ['username must contain at least 1 letter']);

    assertPushesErrors('abc123+', [
      'username must only contain letters/numbers/dashes/underscores',
    ]);

    assertPushesErrors('12', [
      'username must be at least 3 characters long',
      'username must contain at least 1 letter',
    ]);
  });

  describe('should NOT push any errors when', () => {
    function assertDoesNotPushErrors(username: string) {
      test(`username=${username}`, () => {
        pushValidationErrorsUserName(username, errors);
        expect(errors).toHaveLength(0);
      });
    }

    assertDoesNotPushErrors('testuser');
    assertDoesNotPushErrors('testUser');
    assertDoesNotPushErrors('testuser123');
    assertDoesNotPushErrors('testUser123');
    assertDoesNotPushErrors('test-user_123');
  });
});
