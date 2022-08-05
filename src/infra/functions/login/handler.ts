import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { formatJSONResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { loginController } from '@useCases/Login'

import schema from './schema'

const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async event => {
  const { headers } = event

  const auth = headers.authorization

  const httpResponse = await loginController.handle(auth)

  return formatJSONResponse(httpResponse)
}

export const main = middyfy(login)
