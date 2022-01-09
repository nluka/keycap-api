import { afterEach, describe, expect, test } from '@jest/globals';
import pushValidationErrorsPracticeSettingsAdvancedPinned from '../pushValidationErrorsPracticeSettingsAdvancedPinned';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('pushValidationErrorsPracticeSettingsAdvancedPinned', () => {
  describe('should', () => {
    describe('push correct error when', () => {
      function assertPushesError(pinned: any) {
        test(`pinned=${JSON.stringify(pinned)}`, () => {
          pushValidationErrorsPracticeSettingsAdvancedPinned(
            pinned,
            'test',
            errors,
          );
          expect(errors).toHaveLength(1);
          expect(errors[0]).toMatch(
            'test.advanced.pinned must be an array of PracticeSettingNameAdvanced',
          );
        });
      }

      assertPushesError(true);
      assertPushesError(false);
      assertPushesError(undefined);
      assertPushesError(123);
      assertPushesError('string');
      assertPushesError({});

      assertPushesError(['nonsense']);
      assertPushesError(['customTexts', 'nonsense']);
    });

    describe('NOT push error when', () => {
      function assertDoesNotPushError(pinned: any) {
        test(`pinned=${JSON.stringify(pinned)}`, () => {
          pushValidationErrorsPracticeSettingsAdvancedPinned(
            pinned,
            'test',
            errors,
          );
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError([]);
      assertDoesNotPushError(['medleyCollectionsCustom', 'customTexts']);
    });
  });
});
