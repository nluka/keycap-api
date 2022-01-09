import {
  DEFAULT_PRACTICE_SETTINGS,
  IPracticeSettings,
} from 'keycap-foundation';
import mongoose from 'mongoose';
import practiceSettingsCreate from './practiceSettingsCreate';
import practiceSettingsModel from './practiceSettingsModel';

export default async function practiceSettingsReplace(
  userId: mongoose.Schema.Types.ObjectId,
  newSettings: IPracticeSettings,
) {
  const settingsDoc = await practiceSettingsModel.findOne({ userId });
  if (settingsDoc === null) {
    await practiceSettingsCreate(userId, DEFAULT_PRACTICE_SETTINGS);
    return;
  }

  await practiceSettingsModel.findOneAndReplace(
    { userId }, // filter
    { userId, ...newSettings }, // replacement
  );
}
