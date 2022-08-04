import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { formatJSONResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { createUserController } from '@useCases/CreateUser'

import schema from './schema'

const createUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async event => {
  const { body, headers } = event

  console.log(headers)

  const httpResponse = await createUserController.handle(body)

  return formatJSONResponse(httpResponse)
}

export const main = middyfy(createUser)
