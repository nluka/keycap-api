import isObject from '../../../../isObject';

export default function errorPusherCustomTexts(
  value: any,
  parentPropertyName: string,
  errors: string[],
) {
  function push() {
    errors.push(
      `${parentPropertyName}.advanced.config.customTexts must be an array of IPracticeCustomText`,
    );
  }

  if (!Array.isArray(value)) {
    push();
    return;
  }

  for (const customText of value) {
    if (
      !isObject(customText) ||
      typeof customText.name !== 'string' ||
      typeof customText.content !== 'string'
    ) {
      push();
      return;
    }
  }
}
