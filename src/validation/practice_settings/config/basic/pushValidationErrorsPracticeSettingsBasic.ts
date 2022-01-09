import isObject from '../../../isObject';
import pushErrorNotAnObject from '../../../pushErrorNotAnObject';
import pushValidationErrorsPracticeSettingsBasicConfig from './pushValidationErrorsPracticeSettingsBasicConfig';
import pushValidationErrorsPracticeSettingsBasicPinned from './pushValidationErrorsPracticeSettingsBasicPinned';

export default function pushValidationErrorsPracticeSettingsBasic(
  basic: any,
  parentPropertyName: string,
  errors: string[],
) {
  if (!isObject(basic)) {
    pushErrorNotAnObject(`${parentPropertyName}.basic`, errors);
    return;
  }

  pushValidationErrorsPracticeSettingsBasicConfig(
    basic.config,
    parentPropertyName,
    errors,
  );
  pushValidationErrorsPracticeSettingsBasicPinned(
    basic.pinned,
    parentPropertyName,
    errors,
  );
}
