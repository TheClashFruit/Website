export default function handler(req, res) {
  res.status(404).json({
    error: 404,
    message: 'Route not found.'
  });
}