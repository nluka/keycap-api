export default function errorPusherMedleyCollectionsActive(
  value: any,
  parentPropertyName: string,
  errors: string[],
) {
  function push() {
    errors.push(
      `${parentPropertyName}.basic.config.medleyCollectionsActive must be an array of strings`,
    );
  }

  if (!Array.isArray(value)) {
    push();
    return;
  }

  for (let i = 0; i < value.length; ++i) {
    if (typeof value[i] !== 'string') {
      push();
      return;
    }
  }
}
