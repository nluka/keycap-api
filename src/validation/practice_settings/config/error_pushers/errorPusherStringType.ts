export default function errorPusherStringType(
  propertyName: string,
  value: any,
  errors: string[],
) {
  if (typeof value !== 'string') {
    errors.push(`${propertyName} must be a string`);
    return true;
  }
  return false;
}
