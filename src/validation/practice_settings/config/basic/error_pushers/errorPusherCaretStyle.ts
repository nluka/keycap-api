import errorPusherStringType from '../../error_pushers/errorPusherStringType';
import errorPusherStringValue from '../../error_pushers/errorPusherStringValue';

export default function errorPusherCaretStyle(
  value: any,
  parentPropertyName: string,
  errors: string[],
) {
  const propName = `${parentPropertyName}.basic.config.caretStyle`;

  if (!errorPusherStringType(propName, value, errors)) {
    errorPusherStringValue(
      propName,
      value,
      ['bar', 'block', 'underline', 'outline'],
      errors,
    );
  }
}
