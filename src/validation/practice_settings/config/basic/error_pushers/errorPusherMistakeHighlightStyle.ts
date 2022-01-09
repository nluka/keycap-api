import errorPusherStringType from '../../error_pushers/errorPusherStringType';
import errorPusherStringValue from '../../error_pushers/errorPusherStringValue';

export default function errorPusherMistakeHighlightStyle(
  value: any,
  parentPropertyName: string,
  errors: string[],
) {
  const propName = `${parentPropertyName}.basic.config.mistakeHighlightStyle`;

  if (!errorPusherStringType(propName, value, errors)) {
    errorPusherStringValue(propName, value, ['background', 'text'], errors);
  }
}
