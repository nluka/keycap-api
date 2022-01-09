import bcrypt from 'bcrypt';
import { IPracticeSettings } from 'keycap-foundation';
import practiceSettingsGet from '../practice_settings/practiceSettingsGet';
import userModel from './userModel';

export default async function userSignIn(
  name: string,
  password: string,
): Promise<ISignInResult> {
  const user = await userModel.findOne({ name });
  if (user === null) {
    return {
      status: SignInStatus.FailedUsernameNotFound,
    };
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return {
      status: SignInStatus.FailedInvalidCredentials,
    };
  }

  return {
    status: SignInStatus.Success,
    data: {
      id: user._id,
      name: user.name,
      practiceSettings: await practiceSettingsGet(user._id),
    },
  };
}

export enum SignInStatus {
  Success,
  FailedUsernameNotFound,
  FailedInvalidCredentials,
}

export interface ISignInResult {
  status: SignInStatus;
  data?: {
    id: any;
    name: string;
    practiceSettings: IPracticeSettings;
  };
}
