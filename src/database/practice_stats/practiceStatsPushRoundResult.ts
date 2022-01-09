import { IPracticeRoundResult } from 'keycap-foundation';
import mongoose from 'mongoose';
import practiceStatsCalcNewAverageRoundResultProperty from './practiceStatsCalcNewAverageRoundResultProperty';
import practiceStatsConvertDoc from './practiceStatsConvertDoc';
import practiceStatsCreate from './practiceStatsCreate';
import practiceStatsModel from './practiceStatsModel';

export default async function practiceStatsPushRoundResult(
  userId: mongoose.Schema.Types.ObjectId,
  roundResult: IPracticeRoundResult,
) {
  let statsDoc = await practiceStatsModel.findOne({
    userId,
  });
  if (statsDoc === null) {
    statsDoc = await practiceStatsCreate(userId);
  }

  const updatedLastTenRoundResults = [
    ...statsDoc.lastTenRoundResults.slice(
      statsDoc.lastTenRoundResults.length >= 10 ? 1 : 0,
    ),
    roundResult,
  ];
  const updatedAverageRoundResult: IPracticeRoundResult = {
    netWordsPerMinute: practiceStatsCalcNewAverageRoundResultProperty(
      statsDoc.averageRoundResult.netWordsPerMinute,
      statsDoc.roundsCompletedCount,
      roundResult.netWordsPerMinute,
    ),
    accuracyPercentage: practiceStatsCalcNewAverageRoundResultProperty(
      statsDoc.averageRoundResult.accuracyPercentage,
      statsDoc.roundsCompletedCount,
      roundResult.accuracyPercentage,
    ),
    timeElapsed: practiceStatsCalcNewAverageRoundResultProperty(
      statsDoc.averageRoundResult.timeElapsed,
      statsDoc.roundsCompletedCount,
      roundResult.timeElapsed,
    ),
  };
  const updatedRoundsCompletedCount = statsDoc.roundsCompletedCount + 1;

  const updatedStatsDoc = await practiceStatsModel.findOneAndUpdate(
    { userId }, // filter
    {
      // update
      lastTenRoundResults: updatedLastTenRoundResults,
      averageRoundResult: updatedAverageRoundResult,
      roundsCompletedCount: updatedRoundsCompletedCount,
    },
    { new: true },
  );

  return practiceStatsConvertDoc(updatedStatsDoc);
}
