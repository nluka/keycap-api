import isObject from '../../../isObject';
import pushErrorNotAnObject from '../../../pushErrorNotAnObject';
import practiceSettingsBasicConfigPropertyToErrorPusherMap from './practiceSettingsBasicConfigPropertyToErrorPusherMap';

export default function pushValidationErrorsPracticeSettingsBasicConfig(
  config: any,
  parentPropertyName: string,
  errors: string[],
) {
  if (!isObject(config)) {
    pushErrorNotAnObject(`${parentPropertyName}.basic.config`, errors);
    return;
  }

  practiceSettingsBasicConfigPropertyToErrorPusherMap.forEach(
    (errorPusher, basicSettingName) => {
      const providedSettingValue = config[basicSettingName];
      if (providedSettingValue === undefined) {
        errors.push(
          `${parentPropertyName}.basic.config.${basicSettingName} is required`,
        );
      } else {
        /*
          `errorPusher` is a function that validates the type and value
          of a property and pushes descriptive messages to `errors` when
          there are issues related to type or value
        */
        errorPusher(providedSettingValue, parentPropertyName, errors);
      }
    },
  );
}
