export default function errorPusherCustomTextActive(
  value: any,
  parentPropertyName: string,
  errors: string[],
) {
  if (typeof value !== 'string' && value !== null) {
    errors.push(
      `${parentPropertyName}.basic.config.customTextActive must be a string or null`,
    );
  }
}
