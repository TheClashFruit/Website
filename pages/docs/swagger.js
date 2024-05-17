import SwaggerUI from 'swagger-ui-react';

import 'swagger-ui-react/swagger-ui.css';
import 'swagger-ui-themes/themes/3.x/theme-material.css';

import Meta from '@/components/Meta';

export default function Swagger() {
  return (
    <>
      <Meta pageData={{ title: 'Swagger UI', type: 'page' }} />

      <SwaggerUI url="https://cdn.theclashfruit.me/data/swagger.json" />
    </>
  );
}