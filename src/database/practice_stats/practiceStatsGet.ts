import mongoose from 'mongoose';
import practiceStatsConvertDoc from './practiceStatsConvertDoc';
import practiceStatsCreate from './practiceStatsCreate';
import practiceStatsModel from './practiceStatsModel';

// Info regarding type of userId: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/12385
export default async function practiceStatsGet(
  userId: mongoose.Schema.Types.ObjectId,
) {
  const statsDoc = await practiceStatsModel.findOne({ userId });
  if (statsDoc === null) {
    return await practiceStatsCreate(userId);
  }
  return practiceStatsConvertDoc(statsDoc);
}
