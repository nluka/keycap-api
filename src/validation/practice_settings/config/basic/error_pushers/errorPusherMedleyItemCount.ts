import { PRACTICE_SETTINGS_MEDLEY_ITEM_COUNT_LIMITS } from 'keycap-foundation';
import errorPusherNumberType from '../../error_pushers/errorPusherNumberType';
import errorPusherNumberValue from '../../error_pushers/errorPusherNumberValue';

export default function errorPusherMedleyItemCount(
  value: any,
  parentPropertyName: string,
  errors: string[],
) {
  const propName = `${parentPropertyName}.basic.config.medleyItemCount`;

  if (!errorPusherNumberType(propName, value, errors)) {
    errorPusherNumberValue(
      propName,
      value,
      PRACTICE_SETTINGS_MEDLEY_ITEM_COUNT_LIMITS,
      errors,
    );
  }
}
