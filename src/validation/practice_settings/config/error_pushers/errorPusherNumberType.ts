export default function errorPusherNumberType(
  propertyName: string,
  value: any,
  errors: string[],
) {
  if (typeof value !== 'number') {
    errors.push(`${propertyName} must be a number`);
    return true;
  }
  return false;
}
