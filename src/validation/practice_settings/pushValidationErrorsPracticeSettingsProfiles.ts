import isObject from '../isObject';
import pushErrorNotAnArray from '../pushErrorNotAnArray';
import pushErrorNotAnObject from '../pushErrorNotAnObject';
import pushValidationErrorsPracticeSettingsConfigAdvanced from './config/advanced/pushValidationErrorsPracticeSettingsAdvanced';
import pushValidationErrorsPracticeSettingsConfigBasic from './config/basic/pushValidationErrorsPracticeSettingsBasic';

export default function pushValidationErrorsPracticeSettingsProfiles(
  profiles: any,
  errors: string[],
) {
  if (!Array.isArray(profiles)) {
    pushErrorNotAnArray('practiceSettings.profiles', errors);
    return;
  }

  profiles.forEach((profile, index) => {
    if (typeof profile.name !== 'string') {
      errors.push(`practiceSettings.profiles[${index}].name must be a string`);
    } else if (profile.name.length === 0 || profile.name.length > 32) {
      errors.push(
        `practiceSettings.profiles[${index}].name.length must be in range [1, 32]`,
      );
    }

    if (!isObject(profile.config)) {
      pushErrorNotAnObject(
        `practiceSettings.profiles[${index}].config`,
        errors,
      );
      return;
    }

    pushValidationErrorsPracticeSettingsConfigBasic(
      profile.config.basic,
      `practiceSettings.profiles[${index}].config`,
      errors,
    );
    pushValidationErrorsPracticeSettingsConfigAdvanced(
      profile.config.advanced,
      `practiceSettings.profiles[${index}].config`,
      errors,
    );
  });
}
