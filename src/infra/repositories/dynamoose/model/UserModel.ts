import { SchemaDefinition } from 'dynamoose/dist/Schema'

export const UserSchema: SchemaDefinition = {
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  lastname: {
    type: String,
  },
}
