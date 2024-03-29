import Database from '../../../../lib/Database';

import { createSecretKey } from 'crypto';
import { jwtVerify } from 'jose';

export default async function handler(req, res) {
  const db = new Database();

  const headers = req.headers;

  const token = headers.authorization;

  try {
    if (!token)
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'No token was provided.'
      });

    const secret = createSecretKey(process.env.JWT_SECRET, 'utf-8');

    const { payload, protectedHeader } = await jwtVerify(token.split(' ')[1], secret, {});

    const user = await db.getUserFromEmail(payload.email);

    if (!payload)
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'The token provided is invalid.'
      });

    res.status(200).json({
      id: user.id,
      display_name: user.display_name,
      username: user.username,
      profile_picture: user.profile_picture,
      email: user.email,
      public_key: user.public_key,
      created: user.created,
      updated: user.updated,
      last_login: user.last_login
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An internal server error occurred. Please try again later.',
      debug: error.stack
    });
  }
}