import errorPusherBooleanType from '../../error_pushers/errorPusherBooleanType';

export default function errorPusherIsKeyboardVisualEnabled(
  value: any,
  parentPropertyName: string,
  errors: string[],
) {
  errorPusherBooleanType(
    `${parentPropertyName}.basic.config.isKeyboardVisualEnabled`,
    value,
    errors,
  );
}
