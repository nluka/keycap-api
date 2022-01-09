import mongoose from 'mongoose';
import practiceStatsConvertDoc from './practiceStatsConvertDoc';
import practiceStatsCreate from './practiceStatsCreate';
import practiceStatsModel from './practiceStatsModel';

export default async function practiceStatsIncrementRoundsAbortedCount(
  userId: mongoose.Schema.Types.ObjectId,
) {
  let statsDoc = await practiceStatsModel.findOne({
    userId,
  });
  if (statsDoc === null) {
    statsDoc = await practiceStatsCreate(userId);
  }

  const updatedStatsDoc = await practiceStatsModel.findOneAndUpdate(
    { userId }, // filter
    {
      // update
      roundsAbortedCount: statsDoc.roundsAbortedCount + 1,
    },
    { new: true },
  );

  return practiceStatsConvertDoc(updatedStatsDoc);
}
