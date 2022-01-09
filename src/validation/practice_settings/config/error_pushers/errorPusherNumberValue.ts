import NumberRange from 'nluka-number-range';

export default function errorPusherNumberValue(
  propertyName: string,
  value: any,
  limits: NumberRange,
  errors: string[],
) {
  if (!limits.containsFloat(value)) {
    errors.push(
      `${propertyName} must be in range [${limits.getMin()}, ${limits.getMax()}]`,
    );
    return true;
  }
  return false;
}
