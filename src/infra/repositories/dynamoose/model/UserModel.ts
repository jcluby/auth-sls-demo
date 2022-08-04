import { SchemaDefinition } from 'dynamoose/dist/Schema'

export const UserSchema: SchemaDefinition = {
  login: {
    type: String,
  },
}
