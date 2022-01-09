import errorPusherStringType from '../../error_pushers/errorPusherStringType';
import errorPusherStringValue from '../../error_pushers/errorPusherStringValue';

export default function errorPusherTextCasing(
  value: any,
  parentPropertyName: string,
  errors: string[],
) {
  const propName = `${parentPropertyName}.basic.config.textCasing`;

  if (!errorPusherStringType(propName, value, errors)) {
    errorPusherStringValue(
      propName,
      value,
      ['dynamic', 'force-lower', 'force-upper'],
      errors,
    );
  }
}
