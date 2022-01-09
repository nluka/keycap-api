import isObject from '../isObject';
import errorPusherNumberType from '../practice_settings/config/error_pushers/errorPusherNumberType';
import pushErrorNotAnObject from '../pushErrorNotAnObject';

/**
 * Goes through `reqBody` and verifies that all required properties
 * are present and of the correct type. If there are issues with missing
 * properties or incorrect types, a descriptive message for each issue is
 * pushed to `errors`.
 * @param roundResult The object to validate.
 * @param errors The array of errors to add to.
 */
export default function pushValidationErrorsPracticeStatsUpdate(
  roundResult: any,
  errors: string[],
) {
  if (!isObject(roundResult)) {
    pushErrorNotAnObject('roundResult', errors);
    return;
  }

  errorPusherNumberType(
    'roundResult.netWordsPerMinute',
    roundResult.netWordsPerMinute,
    errors,
  );
  errorPusherNumberType(
    'roundResult.accuracyPercentage',
    roundResult.accuracyPercentage,
    errors,
  );
  errorPusherNumberType(
    'roundResult.timeElapsed',
    roundResult.timeElapsed,
    errors,
  );
}
