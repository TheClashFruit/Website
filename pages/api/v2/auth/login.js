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

  if (!body.email || !body.password)
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is missing required parameters.'
    });

  const user = await db.getUserFromEmail(body.email);

  if (!user)
    return res.status(404).json({
      error: 'Not Found',
      message: 'The user could not be found.'
    });

  const match = await bcrypt.compare(body.password, user.password);

  if (!match)
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'The password provided is incorrect.'
    });

  await db.setUserLastLogin(user.id);

  const secret = createSecretKey(process.env.JWT_SECRET, 'utf-8');

  const jwt = await new SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN)
    .sign(secret);

  res.status(200).json({ user, jwt });
}