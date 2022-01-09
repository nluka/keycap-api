import { IPracticeSettings } from 'keycap-foundation';
import mongoose from 'mongoose';
import practiceSettingsModel from './practiceSettingsModel';

export default async function practiceSettingsCreate(
  userId: mongoose.Schema.Types.ObjectId,
  settings: IPracticeSettings,
) {
  const newSettings = new practiceSettingsModel({ userId, ...settings });
  await newSettings.save();
}
