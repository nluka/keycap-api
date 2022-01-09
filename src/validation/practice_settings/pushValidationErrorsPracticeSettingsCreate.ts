import isObject from '../isObject';
import pushErrorNotAnObject from '../pushErrorNotAnObject';
import pushValidationErrorsPracticeSettingsCurrentConfig from './pushValidationErrorsPracticeSettingsCurrentConfig';
import pushValidationErrorsPracticeSettingsProfiles from './pushValidationErrorsPracticeSettingsProfiles';

/**
 * Goes through `practiceSettings` and verifies that all required properties
 * are present and of the correct type. If there are issues with missing
 * properties or incorrect types, a descriptive message for each issue is
 * pushed to `errors`.
 * @param settings The object to validate.
 * @param errors The array of errors to add to.
 */
export default function pushValidationErrorsPracticeSettingsCreate(
  settings: any,
  errors: string[],
) {
  if (!isObject(settings)) {
    pushErrorNotAnObject('practiceSettings', errors);
    return;
  }

  pushValidationErrorsPracticeSettingsCurrentConfig(
    settings.currentConfig,
    errors,
  );
  pushValidationErrorsPracticeSettingsProfiles(settings.profiles, errors);
}
