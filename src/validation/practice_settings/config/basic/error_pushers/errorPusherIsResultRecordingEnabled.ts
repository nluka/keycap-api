import errorPusherBooleanType from '../../error_pushers/errorPusherBooleanType';

export default function errorPusherIsResultRecordingEnabled(
  value: any,
  parentPropertyName: string,
  errors: string[],
) {
  errorPusherBooleanType(
    `${parentPropertyName}.basic.config.isResultRecordingEnabled`,
    value,
    errors,
  );
}
