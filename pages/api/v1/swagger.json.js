export default function handler(req, res) {
  res.status(200).json({
    'openapi': '3.0.3',
    'info': {
      'title': 'Title',
      'description': 'Title',
      'version': '1.0.0'
    },
    'servers': [
      {
        'url': 'http://localhost:3000/api/v1',
        'description': 'Local Testing'
      },
      {
        'url': 'https://theclashfruit.me/api/v1',
        'description': 'Production'
      },
      {
        'url': 'https://beta.theclashfruit.me/api/v1',
        'description': 'Beta'
      }
    ],
    'paths': {
      '/gallery': {
        'get': {
          'description': 'Gallery Images',
          'parameters': [
            {
              'name': 'offset',
              'in': 'query',
              'description': 'Offset of items.',
              'required': false,
              'schema': {
                'type': 'integer'
              }
            },
            {
              'name': 'limit',
              'in': 'query',
              'description': 'Limit of items.',
              'required': false,
              'schema': {
                'type': 'integer'
              }
            }
          ],
          'responses': {
            '200': {
              'description': 'Gallery Images',
              'content': {
                'application/json': {
                  'schema': {
                    'type': 'object',
                    'properties': {
                      'data': {
                        'type': 'array',
                        'items': {
                          '$ref': '#/components/schemas/Gallery'
                        }
                      },
                      'total': {
                        'type': 'integer'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    'components': {
      'schemas': {
        'Gallery': {
          'type': 'object',
          'properties': {
            'alt': {
              'type': 'string'
            },
            'preview': {
              'type': 'string'
            },
            'image': {
              'type': 'object',
              'properties': {
                'cr3': {
                  'type': 'object',
                  'properties': {
                    'name': {
                      'type': 'string'
                    },
                    'url': {
                      'type': 'string'
                    }
                  }
                },
                'jpg': {
                  'type': 'object',
                  'properties': {
                    'name': {
                      'type': 'string'
                    },
                    'url': {
                      'type': 'string'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
}