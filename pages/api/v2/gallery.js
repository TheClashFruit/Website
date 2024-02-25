import Database from '../../../lib/Database';

export default async function handler(req, res) {
  const db = new Database();

  const images = await db.getGallery();

  res.status(200).json({
    data: images,
    total: images.length
  });
}