import Database from '../../../lib/Database';

export default async function handler(req, res) {
  const db = new Database();

  const query = req.query;

  const projects = await db.getProjects(query.offset, query.limit, query.q);
  const totalProjects = await db.getProjectCount(query.q);

  res.status(200).json({
    hits: projects,
    offset: parseInt(query.offset) || 0,
    limit: parseInt(query.limit) || 10,
    total: projects.length
  });
}