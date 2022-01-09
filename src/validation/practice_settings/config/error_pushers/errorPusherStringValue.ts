export default function errorPusherStringValue(
  propertyName: string,
  value: any,
  validValues: string[],
  errors: string[],
) {
  if (!validValues.includes(value)) {
    errors.push(
      `${propertyName} must be ${validValues
        .map((val) => JSON.stringify(val))
        .join('|')}`,
    );
    return true;
  }
  return false;
}
