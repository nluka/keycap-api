export default function pushErrorNotAnArray(
  property: string,
  errors: string[],
) {
  errors.push(`${property} must be an array`);
}
