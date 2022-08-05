import { SchemaDefinition } from 'dynamoose/dist/Schema'

export const LoginSchema: SchemaDefinition = {
  clientId: {
    type: String,
  },
  clientSecret: {
    type: String,
  },
}
