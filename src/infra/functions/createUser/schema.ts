export default {
  type: 'object',
  properties: {
    id: { type: 'string' },
    email: { type: 'string' },
    name: { type: 'string' },
    lastname: { type: 'string' },
  },
  required: ['email', 'name', 'lastname'],
} as const
