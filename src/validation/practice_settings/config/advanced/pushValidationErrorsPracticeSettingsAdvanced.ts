import isObject from '../../../isObject';
import pushErrorNotAnObject from '../../../pushErrorNotAnObject';
import pushValidationErrorsPracticeSettingsAdvancedConfig from './pushValidationErrorsPracticeSettingsAdvancedConfig';
import pushValidationErrorsPracticeSettingsAdvancedPinned from './pushValidationErrorsPracticeSettingsAdvancedPinned';

export default function pushValidationErrorsPracticeSettingsAdvanced(
  advanced: any,
  parentPropertyName: string,
  errors: string[],
) {
  if (!isObject(advanced)) {
    pushErrorNotAnObject(`${parentPropertyName}.advanced`, errors);
    return;
  }

  pushValidationErrorsPracticeSettingsAdvancedConfig(
    advanced.config,
    parentPropertyName,
    errors,
  );
  pushValidationErrorsPracticeSettingsAdvancedPinned(
    advanced.pinned,
    parentPropertyName,
    errors,
  );
}
