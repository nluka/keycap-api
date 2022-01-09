import jsonWebToken from 'jsonwebtoken';

export interface ITokenPayload {
  user: {
    id: string;
  };
}

export default function createJsonWebToken(userId: string) {
  const payload: ITokenPayload = { user: { id: userId } };
  return jsonWebToken.sign(
    payload,
    process.env['JSON_WEB_TOKEN_SECRET'] || 'placeholder-secret',
    {
      expiresIn: process.env['JSON_WEB_TOKEN_DURATION'] || '4h',
    },
  );
}
