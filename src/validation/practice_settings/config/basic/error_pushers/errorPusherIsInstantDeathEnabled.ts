import errorPusherBooleanType from '../../error_pushers/errorPusherBooleanType';

export default function errorPusherIsInstantDeathEnabled(
  value: any,
  parentPropertyName: string,
  errors: string[],
) {
  errorPusherBooleanType(
    `${parentPropertyName}.basic.config.isInstantDeathEnabled`,
    value,
    errors,
  );
}
