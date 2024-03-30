import Database from '../../../../lib/Database';

export default async function handler(req, res) {
  const db = new Database();

  const { method, headers, body } = req;

  if (method === 'GET') {
    const vitals = await db.getVitals();

    res.status(200).json(vitals);
  } else if (method === 'POST') {
    if (headers['dnt'] === '1')
      return res.status(200).json({
        tracked: false,
        reason: '`Do Not Track` header is enabled.'
      });

    try {
      await db.storeVital(JSON.parse(body));

      res.status(200).json({
        tracked: true,
        reason: '-'
      });
    } catch (e) {
      res.status(400).json({
        tracked: false,
        reason: 'There was an error processing the request.',
        message: e.message
      });
    }
  } else {
    res.setHeader('Allow', [ 'GET', 'POST' ]);

    return res.status(405).json({
      tracked: false,
      reason: 'Method Not Allowed',
      message: 'This endpoint only supports POST requests.'
    });
  }
}