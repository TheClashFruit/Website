export default function handler(req, res) {
  res.status(200).json({
    buildId: process.env.BUILD_ID,
  })
}