import * as dynamoose from 'dynamoose'
import { SchemaDefinition } from 'dynamoose/dist/Schema'
import { LoginSchema } from './LoginModel'
import { UserSchema } from './UserModel'
/**
 * Single table Schema
 */
const schema: SchemaDefinition = {
  pk: {
    type: String,
    hashKey: true,
  },
  sk: {
    type: String,
    rangeKey: true,
  },
  description: {
    type: String,
  },
  ...UserSchema,
  ...LoginSchema,
}

export const MainModel = dynamoose.model<any>(process.env.NAME_MS, new dynamoose.Schema(schema, { timestamps: true }), {
  create: false,
  update: false,
  waitForActive: true,
})
