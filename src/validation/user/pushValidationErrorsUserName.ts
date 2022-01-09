export default function pushValidationErrorsUserName(
  username: any,
  errors: string[],
) {
  if (typeof username !== 'string') {
    errors.push('username must be a string');
    return;
  }

  if (username.length < 3) {
    errors.push('username must be at least 3 characters long');
  } else if (username.length > 32) {
    errors.push('username must be no longer than 32 characters');
  } else if (!username.match(/^[a-zA-Z0-9-_]{3,32}$/)) {
    errors.push(
      'username must only contain letters/numbers/dashes/underscores',
    );
  }

  if (!username.match(/[a-zA-Z]+/)) {
    errors.push('username must contain at least 1 letter');
  }
}
