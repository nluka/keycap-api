import isObject from '../isObject';
import pushErrorNotAnObject from '../pushErrorNotAnObject';
import pushValidationErrorsPracticeSettingsConfigAdvanced from './config/advanced/pushValidationErrorsPracticeSettingsAdvanced';
import pushValidationErrorsPracticeSettingsConfigBasic from './config/basic/pushValidationErrorsPracticeSettingsBasic';

export default function pushValidationErrorsPracticeSettingsCurrentConfig(
  currentConfig: any,
  errors: string[],
) {
  if (!isObject(currentConfig)) {
    pushErrorNotAnObject('practiceSettings.currentConfig', errors);
    return;
  }

  pushValidationErrorsPracticeSettingsConfigBasic(
    currentConfig.basic,
    'practiceSettings.currentConfig',
    errors,
  );
  pushValidationErrorsPracticeSettingsConfigAdvanced(
    currentConfig.advanced,
    'practiceSettings.currentConfig',
    errors,
  );
}
