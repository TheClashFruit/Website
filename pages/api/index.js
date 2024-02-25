// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from 'fs';

export default function handler(req, res) {
  const resp = {
    latest_version: 1,
    build_id: null,
    swagger: {
      data: 'https://cdn-new.theclashfruit.me/data/swagger.json',
      ui: 'https://theclashfruit.me/docs/swagger',
    },
    versions: [
      {
        name: '1.0.0',
        path: '/api/v1',
        deprecated: true
      },
      {
        name: '2.0.0',
        path: '/api/v2',
        deprecated: false
      }
    ]
  };

  try {
    resp.build_id = fs.readFileSync('.next/BUILD_ID', 'utf8');
  } catch (err) {
    resp.build_id = 'dev';
  }

  res.status(200).json(resp);
}
