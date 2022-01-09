import { PRACTICE_SETTINGS_CARET_DELAY_LIMITS } from 'keycap-foundation';
import errorPusherNumberType from '../../error_pushers/errorPusherNumberType';
import errorPusherNumberValue from '../../error_pushers/errorPusherNumberValue';

export default function errorPusherCaretDelay(
  value: any,
  parentPropertyName: string,
  errors: string[],
) {
  const propName = `${parentPropertyName}.basic.config.caretDelay`;

  if (!errorPusherNumberType(propName, value, errors)) {
    errorPusherNumberValue(
      propName,
      value,
      PRACTICE_SETTINGS_CARET_DELAY_LIMITS,
      errors,
    );
  }
}
