import { CreateUserUseCase } from './CreateUserUseCase'
import { UserRespositoryMemory } from '@infra/repositories/inMemory/UserRepositoryMemory'

describe('Use Cases - CreateUser', () => {
  let createUserUseCase: CreateUserUseCase
  const userRepository = new UserRespositoryMemory()

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(userRepository)
  })

  test('should create user successfully', async () => {
    const result = await createUserUseCase.execute({
      email: 'jose@gmail.com',
      name: 'José Carlos',
      lastname: 'Batista',
    })
    expect(result.isLeft()).toBeFalsy()
    expect(result.value).toBeDefined()
  })

  test('should return error when creating existing user', async () => {
    const result = await createUserUseCase.execute({
      email: 'jose@gmail.com',
      name: 'José Carlos',
      lastname: 'Batista',
    })
    expect(result.isRight()).toBeFalsy()
    if (result.isLeft()) {
      expect(result.value.message).toBe('user exists')
    }
  })
})
