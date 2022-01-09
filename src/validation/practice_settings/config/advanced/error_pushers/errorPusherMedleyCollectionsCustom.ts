import isObject from '../../../../isObject';

export default function errorPusherMedleyCollectionsCustom(
  value: any,
  parentPropertyName: string,
  errors: string[],
) {
  function push() {
    errors.push(
      `${parentPropertyName}.advanced.config.medleyCollectionsCustom must be an array of IPracticeMedleyCollection`,
    );
  }

  if (!Array.isArray(value)) {
    push();
    return;
  }

  for (const collection of value) {
    if (
      !isObject(collection) ||
      typeof collection.name !== 'string' ||
      !Array.isArray(collection.items)
    ) {
      push();
      return;
    }

    for (const item of collection.items) {
      if (typeof item !== 'string') {
        push();
        return;
      }
    }
  }
}
