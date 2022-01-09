import errorPusherBooleanType from '../../error_pushers/errorPusherBooleanType';

export default function errorPusherIsPunctuationEnabled(
  value: any,
  parentPropertyName: string,
  errors: string[],
) {
  errorPusherBooleanType(
    `${parentPropertyName}.basic.config.isPunctuationEnabled`,
    value,
    errors,
  );
}
