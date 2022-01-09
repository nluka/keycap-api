export default function errorPusherBooleanType(
  propertyName: string,
  value: any,
  errors: string[],
) {
  if (typeof value !== 'boolean') {
    errors.push(`${propertyName} must be a boolean`);
    return true;
  }
  return false;
}
