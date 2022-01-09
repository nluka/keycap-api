import { PracticeSettingNameAdvanced } from 'keycap-foundation';
import errorPusherCustomTexts from './error_pushers/errorPusherCustomTexts';
import errorPusherMedleyCollectionsCustom from './error_pushers/errorPusherMedleyCollectionsCustom';

const practiceSettingsAdvancedConfigPropertyToErrorPusherMap = new Map<
  PracticeSettingNameAdvanced,
  (value: any, parentPropertyName: string, errors: string[]) => void
>([
  ['medleyCollectionsCustom', errorPusherMedleyCollectionsCustom],
  ['customTexts', errorPusherCustomTexts],
]);

export default practiceSettingsAdvancedConfigPropertyToErrorPusherMap;
