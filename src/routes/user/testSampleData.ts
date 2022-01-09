import {
  createDeepCopy,
  DEFAULT_PRACTICE_SETTINGS,
  IPracticeSettings,
} from 'keycap-foundation';

const VALID_USER_DATA = {
  username: 'validuser',
  password: 'validpass123',
  practiceSettings: createDeepCopy(
    DEFAULT_PRACTICE_SETTINGS,
  ) as IPracticeSettings,
};

export default VALID_USER_DATA;
