import pushValidationErrorsUserName from './pushValidationErrorsUserName';
import pushValidationErrorsUserPassword from './pushValidationErrorsUserPassword';

export default function pushValidationErrorsUserSignIn(
  reqBody: any,
  errors: string[],
) {
  pushValidationErrorsUserName(reqBody.username, errors);
  pushValidationErrorsUserPassword(reqBody.password, errors);
}
