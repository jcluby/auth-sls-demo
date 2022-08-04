import { IUserRepository } from '@application/repositories/IUserRepository'
import { InputUserModel } from '@application/repositories/model/UserModel'

export class UserRespositoryDynamoose implements IUserRepository {
  async create(user: InputUserModel): Promise<void> {
    console.log(user)

    return null
  }

  async findByLogin(login: string, accountId: string): Promise<boolean> {
    console.log(login, accountId)
    return true
  }
}
