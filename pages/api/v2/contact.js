import rateLimit from '../../../lib/Ratelimit';

import nodemailer from 'nodemailer';
import showdown from 'showdown';

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed', message: 'Method not allowed.' });

    return;
  }

  const converter = new showdown.Converter();

  converter.setFlavor('github');

  try {
    await limiter.check(res, 10, 'contact');

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
        text: req.body.message,
        html: converter.makeHtml(req.body.message),
      });

      res.status(200).json({ message: 'Your message has been sent.' });
    } catch (e) {
      res.status(500).json({ error: 'internal_server_error', message: 'An internal server error occurred.' });
    }
  } catch {
    res.status(429).json({ error: 'rate_limit', message: 'You are being rate limited.' });
  }
}