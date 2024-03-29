import Database from '../../../../lib/Database';

import bcrypt from 'bcrypt';

import { createSecretKey } from 'crypto';
import { SignJWT } from 'jose';

export default async function handler(req, res) {
  const db = new Database();

  if (req.method !== 'POST')
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'This endpoint only supports POST requests.'
    });

  const body = req.body;

  let user;

  if (!body.username || !body.email || !body.password)
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is missing required parameters.'
    });

  user = await db.getUserFromUsername(body.username);

  if (user)
    return res.status(409).json({
      error: 'Conflict',
      message: 'The username provided is already in use.'
    });

  user = await db.getUserFromEmail(body.email);

  if (user)
    return res.status(409).json({
      error: 'Conflict',
      message: 'The email provided is already in use.'
    });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(body.password, salt);

  const result = await db.createUser(body.username, body.email, hash);

  if (!result)
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An internal server error occurred. Please try again later.'
    });

  user = await db.getUser(result);

  await db.setUserLastLogin(user.id);

  const secret = createSecretKey(process.env.JWT_SECRET, 'utf-8');

  const jwt = await new SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN)
    .sign(secret);

  res.status(200).json({ user, jwt });
}