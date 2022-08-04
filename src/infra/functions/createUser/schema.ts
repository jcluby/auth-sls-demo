export default {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    login: { type: 'string' },
    accountId: { type: 'string' },
    name: { type: 'string' },
  },
  required: ['login', 'name', 'accountId'],
} as const
