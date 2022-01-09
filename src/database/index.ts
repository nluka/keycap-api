import isEnvironmentProduction from '../utilities/isEnvironmentProduction';
import practiceSettingsCreate from './practice_settings/practiceSettingsCreate';
import practiceSettingsGet from './practice_settings/practiceSettingsGet';
import practiceSettingsReplace from './practice_settings/practiceSettingsReplace';
import practiceStatsCreate from './practice_stats/practiceStatsCreate';
import practiceStatsGet from './practice_stats/practiceStatsGet';
import practiceStatsIncrementRoundsAbortedCount from './practice_stats/practiceStatsIncrementRoundsAbortedCount';
import practiceStatsPushRoundResult from './practice_stats/practiceStatsPushRoundResult';
import practiceStatsReset from './practice_stats/practiceStatsReset';
import userCreate from './user/userCreate';
import userDelete from './user/userDelete';
import userDoesNameExist from './user/userDoesNameExist';
import userSignIn, { ISignInResult, SignInStatus } from './user/userSignIn';

if (!isEnvironmentProduction()) {
  require('dotenv').config();
}

export default {
  userDoesNameExist,
  userCreate,
  userSignIn,
  userDelete,
  practiceSettingsCreate,
  practiceSettingsGet,
  practiceSettingsReplace,
  practiceStatsCreate,
  practiceStatsGet,
  practiceStatsPushRoundResult,
  practiceStatsIncrementRoundsAbortedCount,
  practiceStatsReset,
};

export { SignInStatus, ISignInResult };
