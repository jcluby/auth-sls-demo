import { InputUserModel } from '@application/repositories/model/UserModel'
import { IUserRepository } from '@application/repositories/IUserRepository'

export class UserRespositoryMemory implements IUserRepository {
  users = []

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByLogin(_login: string, _accountId: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  create(user: InputUserModel): Promise<void> {
    if (this.users.find(item => item.email === user.email)) {
      return Promise.reject(new Error('user exists'))
    }
    this.users.push(user)
    return Promise.resolve()
  }
}
