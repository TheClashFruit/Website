import rateLimit from '../../../lib/Ratelimit';

import nodemailer from 'nodemailer';
import showdown from 'showdown';

import crypto from 'crypto';

const limiter = rateLimit({
  interval: 60 * 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed', message: 'Method not allowed.' });

    return;
  }

  const converter = new showdown.Converter();

  converter.setFlavor('github');

  const idempotencyKey = crypto.randomUUID();
  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

  try {
    await limiter.check(res, 10, 'contact');

    const userIp = req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const method = 'POST';
    const body = JSON.stringify({
      secret: process.env.TURNSTILE_SECRET,
      response: req.body.turnstile,
      remoteip: userIp,
      idempotency_key: idempotencyKey
    });
    const headers = {
      'Content-Type': 'application/json'
    };

    const firstResult = await fetch(url, {
      method,
      body,
      headers
    });

    const firstOutcome = await firstResult.json();

    if (!firstOutcome.success)
      return res.status(400).json({ error: 'invalid_turnstile', message: `The captcha response was invalid. (${JSON.stringify(firstOutcome['error-codes'])})` });

    const subsequentResult = await fetch(url, {
      method,
      body,
      headers
    });

    const subsequentOutcome = await subsequentResult.json();

    if (!subsequentOutcome.success)
      return res.status(400).json({ error: 'invalid_turnstile', message: `The captcha wasn't passed. (${JSON.stringify(subsequentOutcome['error-codes'])})` });

    try {
      let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.MAIL_FROM,
        replyTo: 'admin@theclashfruit.me',
        to: `"${req.body.name}" <${req.body.email}>`,
        subject: `[TheClashFruit] Contact Form Submission - ${req.body.name}`,
        text: `Looks like you have contacted TheClashFruit.\n\nYour message was:\n${req.body.message}\n\n----------------\n\nIf you didn't send this message, please reply to this e-mail and let me know.\n\nThanks,\nTheClashFruit`,
        html: `<p>Looks like you have contacted TheClashFruit.</p><p>Your message was:</p><pre>${req.body.message}</pre><p>----------------</p><p>If you didn't send this message, please reply to this e-mail and let me know.</p><p>Thanks,<br />TheClashFruit</p>`,
      });

      await transporter.sendMail({
        from: process.env.MAIL_FROM,
        replyTo: `"${req.body.name}" <${req.body.email}>`,
        to: '"TheClashFruit" <admin@theclashfruit.me>',
        subject: `[Contact Form] From ${req.body.name}`,
        text: req.body.message + `\n\n----------------\n\n* User Ip: ${userIp}\n* Passed Turnstile: ${firstOutcome.success} && ${subsequentOutcome.success}`,
        html: converter.makeHtml(req.body.message + `\n\n----------------\n\n* User Ip: ${userIp}\n* Passed Turnstile: ${firstOutcome.success} && ${subsequentOutcome.success}`),
      });

      res.status(200).json({ message: 'Your message has been sent.' });
    } catch (e) {
      res.status(500).json({ error: 'internal_server_error', message: 'An internal server error occurred.' });
    }
  } catch {
    res.status(429).json({ error: 'rate_limit', message: 'You are being rate limited.' });
  }
}