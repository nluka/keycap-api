import isObject from '../../../isObject';
import pushErrorNotAnObject from '../../../pushErrorNotAnObject';
import practiceSettingsAdvancedConfigPropertyToErrorPusherMap from './practiceSettingsAdvancedConfigPropertyToErrorPusherMap';

export default function pushValidationErrorsPracticeSettingsAdvancedConfig(
  config: any,
  parentPropertyName: string,
  errors: string[],
) {
  if (!isObject(config)) {
    pushErrorNotAnObject(`${parentPropertyName}.advanced.config`, errors);
    return;
  }

  practiceSettingsAdvancedConfigPropertyToErrorPusherMap.forEach(
    (errorPusher, advancedSettingName) => {
      const providedPropertyValue = config[advancedSettingName];
      if (providedPropertyValue === undefined) {
        errors.push(
          `${parentPropertyName}.advanced.config.${advancedSettingName} is required`,
        );
      } else {
        errorPusher(providedPropertyValue, parentPropertyName, errors);
      }
    },
  );
}
