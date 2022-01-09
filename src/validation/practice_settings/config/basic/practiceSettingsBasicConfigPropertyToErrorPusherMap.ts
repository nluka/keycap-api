import { PracticeSettingNameBasic } from 'keycap-foundation';
import errorPusherCaretDelay from './error_pushers/errorPusherCaretDelay';
import errorPusherCaretStyle from './error_pushers/errorPusherCaretStyle';
import errorPusherCountdownLength from './error_pushers/errorPusherCountdownLength';
import errorPusherCustomTextActive from './error_pushers/errorPusherCustomTextActive';
import errorPusherIsInstantDeathEnabled from './error_pushers/errorPusherIsInstantDeathEnabled';
import errorPusherIsKeyboardVisualEnabled from './error_pushers/errorPusherIsKeyboardVisualEnabled';
import errorPusherIsPunctuationEnabled from './error_pushers/errorPusherIsPunctuationEnabled';
import errorPusherIsResultRecordingEnabled from './error_pushers/errorPusherIsResultRecordingEnabled';
import errorPusherMedleyCollectionsActive from './error_pushers/errorPusherMedleyCollectionsActive';
import errorPusherMedleyItemCount from './error_pushers/errorPusherMedleyItemCount';
import errorPusherMedleyPunctuationFrequency from './error_pushers/errorPusherMedleyPunctuationFrequency';
import errorPusherMistakeHighlightStyle from './error_pushers/errorPusherMistakeHighlightStyle';
import errorPusherQuoteLength from './error_pushers/errorPusherQuoteLength';
import errorPusherSoundVolume from './error_pushers/errorPusherSoundVolume';
import errorPusherTextCasing from './error_pushers/errorPusherTextCasing';
import errorPusherTextType from './error_pushers/errorPusherTextType';

const practiceSettingsBasicConfigPropertyToErrorPusherMap = new Map<
  PracticeSettingNameBasic,
  (value: any, parentPropertyName: string, errors: string[]) => void
>([
  ['caretDelay', errorPusherCaretDelay],
  ['caretStyle', errorPusherCaretStyle],
  ['countdownLength', errorPusherCountdownLength],
  ['customTextActive', errorPusherCustomTextActive],
  ['isInstantDeathEnabled', errorPusherIsInstantDeathEnabled],
  ['isKeyboardVisualEnabled', errorPusherIsKeyboardVisualEnabled],
  ['isPunctuationEnabled', errorPusherIsPunctuationEnabled],
  ['isResultRecordingEnabled', errorPusherIsResultRecordingEnabled],
  ['medleyCollectionsActive', errorPusherMedleyCollectionsActive],
  ['medleyItemCount', errorPusherMedleyItemCount],
  ['medleyPunctuationFrequency', errorPusherMedleyPunctuationFrequency],
  ['mistakeHighlightStyle', errorPusherMistakeHighlightStyle],
  ['quoteLength', errorPusherQuoteLength],
  ['soundVolume', errorPusherSoundVolume],
  ['textCasing', errorPusherTextCasing],
  ['textType', errorPusherTextType],
]);

export default practiceSettingsBasicConfigPropertyToErrorPusherMap;
