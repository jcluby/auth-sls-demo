import { UserRespositoryDynamoose } from '@infra/repositories/dynamoose/UserRepositoryDynamoose'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'

const createUserRespository = new UserRespositoryDynamoose()

const createUserUseCase = new CreateUserUseCase(createUserRespository)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserController, CreateUserUseCase }
