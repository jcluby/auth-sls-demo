import { InputUserModel } from './model/UserModel'

export interface IUserRepository {
  create(user: InputUserModel): Promise<void>
  findByLogin(login: string, accountId: string): Promise<boolean>
}
