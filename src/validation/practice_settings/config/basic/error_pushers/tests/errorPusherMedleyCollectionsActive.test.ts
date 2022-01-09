import { afterEach, describe, expect, test } from '@jest/globals';
import errorPusherMedleyCollectionsActive from '../errorPusherMedleyCollectionsActive';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('errorPusherMedleyCollectionsActive', () => {
  describe('should', () => {
    describe('push correct error when', () => {
      function assertPushesError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherMedleyCollectionsActive(value, 'test', errors);
          expect(errors).toHaveLength(1);
          expect(errors[0]).toMatch(
            'test.basic.config.medleyCollectionsActive must be an array of strings',
          );
        });
      }

      assertPushesError(true);
      assertPushesError(false);
      assertPushesError(undefined);
      assertPushesError(123);
      assertPushesError('string');
      assertPushesError({});

      assertPushesError([123, null, undefined, {}]);
      assertPushesError([123, 'good', {}]);
    });

    describe('NOT push error when', () => {
      function assertDoesNotPushError(value: any) {
        test(`value=${JSON.stringify(value)}`, () => {
          errorPusherMedleyCollectionsActive(value, 'test', errors);
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError([]);
      assertDoesNotPushError(['collection-1']);
      assertDoesNotPushError(['collection-1', 'collection-2']);
    });
  });
});
