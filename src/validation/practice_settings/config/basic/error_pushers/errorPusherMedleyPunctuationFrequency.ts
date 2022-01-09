import { PRACTICE_SETTINGS_MEDLEY_PUNCTUATION_FREQUENCY_LIMITS } from 'keycap-foundation';
import errorPusherNumberType from '../../error_pushers/errorPusherNumberType';
import errorPusherNumberValue from '../../error_pushers/errorPusherNumberValue';

export default function errorPusherMedleyPunctuationFrequency(
  value: any,
  parentPropertyName: string,
  errors: string[],
) {
  const propName = `${parentPropertyName}.basic.config.medleyPunctuationFrequency`;

  if (!errorPusherNumberType(propName, value, errors)) {
    errorPusherNumberValue(
      propName,
      value,
      PRACTICE_SETTINGS_MEDLEY_PUNCTUATION_FREQUENCY_LIMITS,
      errors,
    );
  }
}
