import { IPracticeRoundResult } from 'keycap-foundation';
import mongoose, { model, Schema } from 'mongoose';

export interface ISchemaPracticeStats {
  userId: mongoose.Schema.Types.ObjectId;
  lastTenRoundResults: IPracticeRoundResult[];
  averageRoundResult: IPracticeRoundResult;
  roundsCompletedCount: number;
  roundsAbortedCount: number;
}

const roundResultObject = {
  netWordsPerMinute: {
    type: Number,
    required: true,
  },
  accuracyPercentage: {
    type: Number,
    required: true,
  },
  timeElapsed: {
    type: Number,
    required: true,
  },
};

const defaultRoundResult = {
  netWordsPerMinute: 0,
  accuracyPercentage: 0,
  timeElapsed: 0,
};

const practiceStatsSchema = new Schema<ISchemaPracticeStats>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  lastTenRoundResults: { type: [roundResultObject], default: [] },
  averageRoundResult: { type: roundResultObject, default: defaultRoundResult },
  roundsCompletedCount: { type: Number, default: 0 },
  roundsAbortedCount: { type: Number, default: 0 },
});

const practiceStatsModel = model('practice-stats', practiceStatsSchema);
export default practiceStatsModel;
