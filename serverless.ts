/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript'

import { authorizeToken, createUser } from '@functions/index'

import { dynamoResources } from '@infra/resourcesFunctions'

const serverlessConfiguration: AWS = {
  service: 'auth-sls-demo',
  frameworkVersion: '2',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      binaryMediaTypes: ['multipart/form-data'],
    },
    apiName: '${self:service}-${opt:stage, self:provider.stage}',
    memorySize: 128,
    timeout: 3,
    stage: 'dev',
    region: 'us-east-1',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      AUTH_SLS_DEMO: '${self:service}-${opt:stage, self:provider.stage}',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      JWT_SECRET: '${self:custom.environment.JWT_SECRET}',
    },
    lambdaHashingVersion: '20201221',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:DeleteItem',
              'dynamodb:Query',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:Scan',
              'dynamodb:UpdateItem',
              'dynamodb:DescribeTable',
              'dynamodb:CreateTable',
            ],
            Resource:
              'arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.AUTH_SLS_DEMO}/*',
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: {
    authorizeToken,
    createUser,
  },
  package: { individually: true },
  custom: {
    region: '${opt:region, self:provider.region}',
    stage: '${opt:stage, self:provider.stage}',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    environment: '${file(env.yml):${self:provider.stage}, file(env.yml):default}',
  },
  resources: {
    Resources: {
      ...dynamoResources,
    },
  },
}

module.exports = serverlessConfiguration
