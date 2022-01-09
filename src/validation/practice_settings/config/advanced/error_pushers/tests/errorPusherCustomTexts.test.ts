import { afterEach, describe, expect, test } from '@jest/globals';
import errorPusherCustomTexts from '../errorPusherCustomTexts';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('errorPusherCustomTexts', () => {
  describe('should', () => {
    describe('push correct error when', () => {
      function assertPushesError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherCustomTexts(value, 'test', errors);
          expect(errors).toHaveLength(1);
          expect(errors[0]).toMatch(
            'test.advanced.config.customTexts must be an array of IPracticeCustomText',
          );
        });
      }

      assertPushesError(true);
      assertPushesError(false);
      assertPushesError(undefined);
      assertPushesError(123);
      assertPushesError('string');
      assertPushesError({});

      assertPushesError({ name: 'missing content' });
      assertPushesError({ content: 'missing name' });
      assertPushesError({ name: 123, content: 'stuff' });
      assertPushesError({ name: 'custom', content: 123 });

      assertPushesError([{ name: 'missing content' }]);
      assertPushesError([{ content: 'missing name' }]);
      assertPushesError([{ name: 123, content: 'stuff' }]);
      assertPushesError([{ name: 'custom', content: 123 }]);
    });

    describe('NOT push error when', () => {
      function assertDoesNotPushError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherCustomTexts(value, 'test', errors);
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError([]);
      assertDoesNotPushError([{ name: 'custom1', content: 'text' }]);
    });
  });
});
