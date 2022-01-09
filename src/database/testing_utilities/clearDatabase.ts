import mongoose from 'mongoose';

export default async function clearDatabase() {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    if (collection == null) {
      continue;
    }
    try {
      await collection.deleteMany({});
    } catch (err) {
      console.error(err);
    }
  }
}
