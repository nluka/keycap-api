import userModel from './userModel';

export default async function userDoesNameExist(name: string) {
  const user = await userModel.findOne({ name });
  return user !== null;
}
