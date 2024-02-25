import Database from '../../../lib/Database';

export default async function handler(req, res) {
  const db = new Database();

  const query = req.query;

  const images = await db.getGallery(query.offset, query.limit, query.q);
  const totalImages = await db.getGalleryCount(query.q);

  res.status(200).json({
    hits: images,
    offset: parseInt(query.offset) || 0,
    limit: parseInt(query.limit) || 10,
    total: totalImages
  });
}