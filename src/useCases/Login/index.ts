import { LoginRespositoryDynamoose } from '@infra/repositories/dynamoose/LoginRepositoryDynamoose'
import { LoginController } from './LoginController'
import { LoginUseCase } from './LoginUseCase'

const loginRespository = new LoginRespositoryDynamoose()

const loginUseCase = new LoginUseCase(loginRespository)

const loginController = new LoginController(loginUseCase)

export { loginController, LoginUseCase }
