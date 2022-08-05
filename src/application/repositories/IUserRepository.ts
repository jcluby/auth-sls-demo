import { InputUserModel } from './model/UserModel'

export interface IUserRepository {
  create(user: InputUserModel): Promise<string>
  findByLogin(login: string, accountId: string): Promise<boolean>
}
