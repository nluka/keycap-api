import { afterEach, describe, expect, test } from '@jest/globals';
import errorPusherMedleyCollectionsCustom from '../errorPusherMedleyCollectionsCustom';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('errorPusherMedleyCollectionsCustom', () => {
  describe('should', () => {
    describe('push correct error when', () => {
      function assertPushesError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherMedleyCollectionsCustom(value, 'test', errors);
          expect(errors).toHaveLength(1);
          expect(errors[0]).toMatch(
            'test.advanced.config.medleyCollectionsCustom must be an array of IPracticeMedleyCollection',
          );
        });
      }

      assertPushesError(true);
      assertPushesError(false);
      assertPushesError(undefined);
      assertPushesError(123);
      assertPushesError('string');
      assertPushesError({});

      assertPushesError({ name: 'missing items' });
      assertPushesError({ items: ['missing name'] });
      assertPushesError({ name: 123, items: ['item1'] });
      assertPushesError({ name: 'custom', content: 123 });

      assertPushesError([{ name: 'missing items' }]);
      assertPushesError([{ items: ['missing name'] }]);
      assertPushesError([{ name: 123, items: ['item1'] }]);
      assertPushesError([{ name: 'custom', content: 123 }]);
    });

    describe('NOT push error when', () => {
      function assertDoesNotPushError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherMedleyCollectionsCustom(value, 'test', errors);
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError([]);
      assertDoesNotPushError([{ name: 'custom1', items: ['i1', 'i2'] }]);
    });
  });
});
