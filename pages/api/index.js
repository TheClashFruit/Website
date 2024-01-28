// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from 'fs';

export default function handler(req, res) {
  try {
    const buildId = fs.readFileSync('.next/BUILD_ID', 'utf8');

    res.status(200).json({
      latestVersion: 0,
      buildId: buildId ,
      versions: [
        {
          name: '1.0.0',
          swagger: 'swagger.json',
        }
      ]
    });
  } catch (err) {
    console.log(err);

    res.status(200).json({
      latestVersion: 0,
      buildId: 'dev',
      swagger: '/swagger.json',
      versions: [
        {
          name: '1.0.0',
          path: '/api/v1/',
        }
      ]
    });
  }
}
