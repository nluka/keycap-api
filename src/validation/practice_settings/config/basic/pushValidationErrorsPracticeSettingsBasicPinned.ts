import practiceSettingsBasicConfigPropertyToErrorPusherMap from './practiceSettingsBasicConfigPropertyToErrorPusherMap';

export default function pushValidationErrorsPracticeSettingsBasicPinned(
  pinned: any,
  parentPropertyName: string,
  errors: string[],
) {
  const errMessage = `${parentPropertyName}.basic.pinned must be an array of PracticeSettingNameBasic`;
  if (!Array.isArray(pinned)) {
    errors.push(errMessage);
    return;
  }

  for (const settingName of pinned) {
    if (
      // checking whether `settingName` is known
      practiceSettingsBasicConfigPropertyToErrorPusherMap.get(settingName) ===
      undefined
    ) {
      errors.push(errMessage);
      break;
    }
  }
}
