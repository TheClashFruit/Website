import Database from '../../../../lib/Database';

export default async function handler(req, res) {
  const db = new Database();

  const query = req.query;

  const username = query.username;

  try {
    let user;

    if (username.match(/^[0-9]+$/))
      user = await db.getUser(query.username);
    else
      user = await db.getUserFromUsername(query.username);

    if (!user)
      return res.status(404).json({
        error: 'Not Found',
        message: 'The user could not be found.'
      });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An internal server error occurred. Please try again later.',
      debug: error.stack
    });
  }
}