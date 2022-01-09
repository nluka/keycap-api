import mongoose from 'mongoose';

export default function convertMongooseObjectArray<T>(
  mongooseArray: mongoose.Types.Array<any>,
  objectProperties: string[],
) {
  const array: T[] = [];

  mongooseArray.forEach((collection: any) => {
    const object: any = {};
    objectProperties.forEach((prop) => {
      object[prop] = collection[prop];
    });
    array.push(object);
  });

  return array;
}
