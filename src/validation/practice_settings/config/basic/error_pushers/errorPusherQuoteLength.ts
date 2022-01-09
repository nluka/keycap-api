import { PRACTICE_SETTINGS_QUOTE_LENGTH_LIMITS } from 'keycap-foundation';
import isObject from '../../../../isObject';
import errorPusherNumberType from '../../error_pushers/errorPusherNumberType';
import errorPusherNumberValue from '../../error_pushers/errorPusherNumberValue';

const propsToCheck = ['min', 'max'];

export default function errorPusherQuoteLength(
  value: any,
  parentPropertyName: string,
  errors: string[],
) {
  const propName = `${parentPropertyName}.basic.config.quoteLength`;

  if (!isObject(value)) {
    errors.push(`${propName} must be an object`);
    return;
  }

  for (const prop of propsToCheck) {
    if (errorPusherNumberType(`${propName}.${prop}`, value[prop], errors)) {
      return;
    }

    if (
      errorPusherNumberValue(
        `${propName}.${prop}`,
        value[prop],
        PRACTICE_SETTINGS_QUOTE_LENGTH_LIMITS,
        errors,
      )
    ) {
      return;
    }
  }

  if (value['min'] > value['max']) {
    errors.push(`${propName}.min cannot be greater than ${propName}.max`);
  }
}
