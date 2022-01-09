import bcrypt from 'bcrypt';
import { IPracticeSettings } from 'keycap-foundation';
import database from '../index';
import userModel from './userModel';

export default async function userCreate(
  name: string,
  password: string,
  practiceSettings: IPracticeSettings,
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({ name, password: hashedPassword });
  await newUser.save();

  await database.practiceSettingsCreate(newUser._id, practiceSettings);

  return {
    id: newUser._id,
    name: newUser.name,
  };
}
