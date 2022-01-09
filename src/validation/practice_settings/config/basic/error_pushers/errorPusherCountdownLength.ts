import { PRACTICE_SETTINGS_COUNTDOWN_LENGTH_LIMITS } from 'keycap-foundation';
import errorPusherNumberType from '../../error_pushers/errorPusherNumberType';
import errorPusherNumberValue from '../../error_pushers/errorPusherNumberValue';

export default function errorPusherCountdownLength(
  value: any,
  parentPropertyName: string,
  errors: string[],
) {
  const propName = `${parentPropertyName}.basic.config.countdownLength`;

  if (!errorPusherNumberType(propName, value, errors)) {
    errorPusherNumberValue(
      propName,
      value,
      PRACTICE_SETTINGS_COUNTDOWN_LENGTH_LIMITS,
      errors,
    );
  }
}
