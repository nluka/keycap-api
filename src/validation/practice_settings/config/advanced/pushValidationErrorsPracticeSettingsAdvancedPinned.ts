import practiceSettingsAdvancedConfigPropertyToErrorPusherMap from './practiceSettingsAdvancedConfigPropertyToErrorPusherMap';

export default function pushValidationErrorsPracticeSettingsAdvancedPinned(
  pinned: any,
  parentPropertyName: string,
  errors: string[],
) {
  const errMessage = `${parentPropertyName}.advanced.pinned must be an array of PracticeSettingNameAdvanced`;

  if (!Array.isArray(pinned)) {
    errors.push(errMessage);
    return;
  }

  for (const settingName of pinned) {
    if (
      // checking whether `settingName` is known
      practiceSettingsAdvancedConfigPropertyToErrorPusherMap.get(
        settingName,
      ) === undefined
    ) {
      errors.push(errMessage);
      break;
    }
  }
}
