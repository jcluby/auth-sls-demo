import { OutputLoginModel } from './model/LoginModel'

export interface ILoginRepository {
  findByClientId(clientId: string): Promise<OutputLoginModel>
}
