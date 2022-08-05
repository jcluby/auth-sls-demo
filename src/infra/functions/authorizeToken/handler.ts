import { authVerify } from '@infra/authentication'
import { generatePolicy, ValidatedAuthCustomApiGatewayProxyEvent } from '@infra/libs/apiGateway'
import { middyfy } from '@libs/lambda'

const authorizeToken: ValidatedAuthCustomApiGatewayProxyEvent = async event => {
  const { authorizationToken } = event

  if (!authorizationToken) return generatePolicy(null, false)

  const tokenParts = authorizationToken.split(' ')
  const tokenValue = tokenParts[1]

  const tokenResponse = await authVerify({
    token: tokenValue,
  })

  if (tokenResponse.error) {
    return generatePolicy(null, false)
  }

  return generatePolicy(tokenResponse.sub, true, { auth: true })
}

export const main = middyfy(authorizeToken)
