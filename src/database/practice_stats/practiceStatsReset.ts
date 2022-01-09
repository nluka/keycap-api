import mongoose from 'mongoose';
import practiceStatsCreate from './practiceStatsCreate';
import practiceStatsModel from './practiceStatsModel';

export default async function practiceStatsReset(
  userId: mongoose.Schema.Types.ObjectId,
) {
  await practiceStatsModel.findOneAndDelete({ userId });
  return await practiceStatsCreate(userId);
}
