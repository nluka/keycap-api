export default function pushValidationErrorsUserPassword(
  password: any,
  errors: string[],
) {
  if (typeof password !== 'string') {
    errors.push('password must be a string');
    return;
  }

  if (password.length < 8) {
    errors.push('password must be at least 8 characters long');
  } else if (password.length > 64) {
    errors.push('password must be no longer than 64 characters');
  } else if (
    !password.match(/^[a-zA-Z0-9`~!@#$%^&*()-_=+\[{\]};:'",./? ]{8,64}$/)
  ) {
    errors.push(
      'password must match /^[a-zA-Z0-9`~!@#$%^&*()-_=+[{]};:\'",./? ]{8,64}$/',
    );
  }

  if (!password.match(/[a-zA-Z]+/)) {
    errors.push('password must contain at least 1 letter');
  }
}
