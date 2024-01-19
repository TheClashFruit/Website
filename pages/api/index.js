// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    latestVersion: 0,
    versions: [
      {
        name: '1.0.0',
        swagger: 'swagger.json',
      }
    ]
  });
}
