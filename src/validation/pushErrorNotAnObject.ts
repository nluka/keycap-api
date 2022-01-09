export default function pushErrorNotAnObject(
  property: string,
  errors: string[],
) {
  errors.push(`${property} must be an object`);
}
