export default function handler(req, res) {
  res.status(404).json({
    error: 1,
    message: 'Not Found'
  });
}