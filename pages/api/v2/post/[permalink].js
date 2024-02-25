import Database from '../../../../lib/Database';

export default async function handler(req, res) {
  const db = new Database();

  const query = req.query;

  const post = await db.getPost(query.permalink);

  res.status(200).json(post);
}