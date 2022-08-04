/* eslint-disable no-template-curly-in-string */
export default {
  UsersTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: '${self:provider.environment.AUTH_SLS_DEMO}',
      KeySchema: [
        {
          AttributeName: 'pk',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'sk',
          KeyType: 'RANGE',
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: 'pk',
          AttributeType: 'S',
        },
        {
          AttributeName: 'sk',
          AttributeType: 'S',
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'sk-pk-index',
          KeySchema: [
            {
              AttributeName: 'sk',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'pk',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    },
  },
}
