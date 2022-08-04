import { IUserRepository } from '@application/repositories/IUserRepository'
import { IError } from '@core/error/IError'
import { Either, left, right } from '@core/logic/Either'
import { UserEntity } from '@domain/entities/user/UserEntity'
import { CreateUserUseCaseError } from './CreateUser.error'
import { ICreateUsertDTO } from './CreateUserDTO'

export class CreateUserUseCase {
  constructor(private createUserRespository: IUserRepository) {}

  async execute(data: ICreateUsertDTO): Promise<Either<IError, string>> {
    const user = UserEntity.create(data)

    if (user.isLeft()) {
      return left(user.value)
    }

    try {
      await this.createUserRespository.create({
        id: user.value.id,
        ...user.value.props,
      })
    } catch (error) {
      return left(CreateUserUseCaseError)
    }

    return right(user.value.id)
  }
}
