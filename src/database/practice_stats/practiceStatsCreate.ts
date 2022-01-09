import mongoose from 'mongoose';
import practiceStatsConvertDoc from './practiceStatsConvertDoc';
import practiceStatsModel from './practiceStatsModel';

export default async function practiceStatsCreate(
  userId: mongoose.Schema.Types.ObjectId,
) {
  const newStats = new practiceStatsModel({ userId });
  await newStats.save();
  return practiceStatsConvertDoc(newStats);
}
