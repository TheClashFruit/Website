import rateLimit from '../../../../lib/Ratelimit';

const limiter = rateLimit({
  interval: 2000,
  uniqueTokenPerInterval: 500,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'This endpoint only supports POST requests.'
    });
  }

  try {
    try {
      await limiter.check(res, 2, 'impression');

      res.status(200).json({
        impressed: true,
        id: JSON.parse(req.body).id
      });
    } catch (e) {
      return res.status(429).json({
        impressed: false,
        id: JSON.parse(req.body).id,
        message: 'no cheating!'
      });
    }
  } catch (e) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is not valid JSON.'
    });
  }
}