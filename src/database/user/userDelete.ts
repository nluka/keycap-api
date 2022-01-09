import mongoose from 'mongoose';
import practiceSettingsModel from '../practice_settings/practiceSettingsModel';
import practiceStatsModel from '../practice_stats/practiceStatsModel';
import userModel from './userModel';

export default async function userDelete(
  userId: mongoose.Schema.Types.ObjectId,
) {
  await practiceSettingsModel.findOneAndDelete({ userId });
  await practiceStatsModel.findOneAndDelete({ userId });
  await userModel.findByIdAndDelete(userId);
}
