import buildId from 'next-build-id';

export default async function handler(req, res) {
  res.status(200).json({
    buildId: await buildId({ dir: __dirname }),
  })
}