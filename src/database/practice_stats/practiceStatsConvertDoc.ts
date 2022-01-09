import { IPracticeRoundResult } from 'keycap-foundation';
import convertMongooseObjectArray from '../convertMongooseObjectArray';

export default function practiceStatsConvertDoc(doc: any) {
  return {
    lastTenRoundResults: convertMongooseObjectArray<IPracticeRoundResult>(
      doc.lastTenRoundResults,
      ['netWordsPerMinute', 'accuracyPercentage', 'timeElapsed'],
    ),
    averageRoundResult: {
      netWordsPerMinute: doc.averageRoundResult.netWordsPerMinute,
      accuracyPercentage: doc.averageRoundResult.accuracyPercentage,
      timeElapsed: doc.averageRoundResult.timeElapsed,
    },
    roundsCompletedCount: doc.roundsCompletedCount,
    roundsAbortedCount: doc.roundsAbortedCount,
  };
}
