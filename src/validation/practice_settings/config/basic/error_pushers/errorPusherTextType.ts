import errorPusherStringType from '../../error_pushers/errorPusherStringType';
import errorPusherStringValue from '../../error_pushers/errorPusherStringValue';

export default function errorPusherTextType(
  value: any,
  parentPropertyName: string,
  errors: string[],
) {
  const propName = `${parentPropertyName}.basic.config.textType`;

  if (!errorPusherStringType(propName, value, errors)) {
    errorPusherStringValue(
      propName,
      value,
      ['quote', 'medley', 'custom'],
      errors,
    );
  }
}
