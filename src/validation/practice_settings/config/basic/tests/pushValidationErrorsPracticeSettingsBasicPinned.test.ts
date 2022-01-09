import { afterEach, describe, expect, test } from '@jest/globals';
import pushValidationErrorsPracticeSettingsBasicPinned from '../pushValidationErrorsPracticeSettingsBasicPinned';

let errors: string[] = [];

afterEach(() => {
  errors = [];
});

describe('pushValidationErrorsPracticeSettingsBasicPinned', () => {
  describe('should', () => {
    describe('push correct error when', () => {
      function assertPushesError(pinned: any) {
        test(`pinned=${JSON.stringify(pinned)}`, () => {
          pushValidationErrorsPracticeSettingsBasicPinned(
            pinned,
            'test',
            errors,
          );
          expect(errors).toHaveLength(1);
          expect(errors[0]).toMatch(
            'test.basic.pinned must be an array of PracticeSettingNameBasic',
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
      assertPushesError(['textType', 'nonsense']);
    });

    describe('NOT push error when', () => {
      function assertDoesNotPushError(pinned: any) {
        test(`pinned=${JSON.stringify(pinned)}`, () => {
          pushValidationErrorsPracticeSettingsBasicPinned(
            pinned,
            'test',
            errors,
          );
          expect(errors).toHaveLength(0);
        });
      }

      assertDoesNotPushError([]);
      assertDoesNotPushError([
        'caretDelay',
        'caretStyle',
        'isInstantDeathEnabled',
        'isResultRecordingEnabled',
        'medleyItemCount',
        'mistakeHighlightStyle',
        'quoteLength',
        'soundVolume',
        'textType',
      ]);
      assertDoesNotPushError([
        'caretDelay',
        'caretStyle',
        'countdownLength',
        'customTextActive',
        'isInstantDeathEnabled',
        'isKeyboardVisualEnabled',
        'isPunctuationEnabled',
        'isResultRecordingEnabled',
        'medleyCollectionsActive',
        'medleyItemCount',
        'medleyPunctuationFrequency',
        'mistakeHighlightStyle',
        'quoteLength',
        'soundVolume',
        'textCasing',
        'textType',
      ]);
    });
  });
});
