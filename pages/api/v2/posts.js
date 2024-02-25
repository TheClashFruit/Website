import Database from '../../../lib/Database';

export default async function handler(req, res) {
  const db = new Database();

  const query = req.query;

  const posts = await db.getPosts(query.offset, query.limit);
  const totalPosts = await db.getPostCount();

  res.status(200).json({
    data: posts,
    offset: parseInt(query.offset) || 0,
    limit: parseInt(query.limit) || 10,
    total: totalPosts
  });
}