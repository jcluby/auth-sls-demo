import { IUserRepository } from '@application/repositories/IUserRepository'
import { InputUserModel } from '@application/repositories/model/UserModel'
import { MainModel } from './model/MainModel'

export class UserRespositoryDynamoose implements IUserRepository {
  async create(user: InputUserModel): Promise<string> {
    await MainModel.create({
      pk: 'users',
      sk: `user#${user.email}`,
      id: user.id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
    })

    return user.id
  }

  async findByLogin(login: string, accountId: string): Promise<boolean> {
    console.log(login, accountId)
    return true
  }
}
