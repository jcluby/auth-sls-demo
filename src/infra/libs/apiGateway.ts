import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayTokenAuthorizerEvent,
  CustomAuthorizerResult,
  Handler,
} from 'aws-lambda'
import type { FromSchema } from 'json-schema-to-ts'
import { HttpResponse } from '@infra/http/HttpResponse'

/**
 *
 * Validate JSON Schema
 *
 */
type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>
}
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

/**
 *
 * Validate Auth
 *
 */
export type ValidatedAuthCustomApiGatewayProxyEvent = Handler<APIGatewayTokenAuthorizerEvent, CustomAuthorizerResult>

/**
 *
 * Api Responses
 *
 */
export const formatJSONResponse = (response: HttpResponse) => {
  return {
    statusCode: response.statusCode || 500,
    body: JSON.stringify(response.body),
  }
}

export const generatePolicy = (sub: string, allow: boolean, context: any = {}) => {
  return {
    principalId: sub || 'user-token',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: allow ? 'Allow' : 'Deny',
          Resource: '*',
        },
      ],
    },
    context: context,
  }
}
