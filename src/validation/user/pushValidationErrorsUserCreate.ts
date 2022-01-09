import pushValidationErrorsPracticeSettingsCreate from '../practice_settings/pushValidationErrorsPracticeSettingsCreate';
import pushValidationErrorsUserName from './pushValidationErrorsUserName';
import pushValidationErrorsUserPassword from './pushValidationErrorsUserPassword';

export function pushValidationErrorsUserCreate(reqBody: any, errors: string[]) {
  pushValidationErrorsUserName(reqBody.username, errors);
  pushValidationErrorsUserPassword(reqBody.password, errors);
  pushValidationErrorsPracticeSettingsCreate(reqBody.practiceSettings, errors);
}
