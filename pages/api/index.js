// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from 'fs';
import Database from '@/lib/database';

export default function handler(req, res) {
  const resp = {
    latest_version: 0,
    build_id: null,
    swagger: {
      data: 'https://cdn-new.theclashfruit.me/data/swagger.json',
      ui: 'https://theclashfruit.me/docs/swagger',
    },
    versions: [
      {
        name: '1.0.0',
        path: '/api/v1',
        deprecated: false
      }
    ]
  }

  const db = new Database();

  try {
    resp.build_id = fs.readFileSync('.next/BUILD_ID', 'utf8');
  } catch (err) {
    resp.build_id = 'dev';
  }

  res.status(200).json(resp);
}
