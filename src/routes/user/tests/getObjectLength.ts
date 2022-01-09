import isObject from '../../../validation/isObject';

export default function getObjectLength(obj: any) {
  if (!isObject(obj)) {
    return 0;
  }

  let length = 0;
  // @ts-ignore
  for (const prop in obj) {
    ++length;
  }
  return length;
}
