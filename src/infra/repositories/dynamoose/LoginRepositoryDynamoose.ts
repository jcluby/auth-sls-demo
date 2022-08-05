import { ILoginRepository } from '@application/repositories/ILoginRepository'
import { OutputLoginModel } from '@application/repositories/model/LoginModel'
import { MainModel } from './model/MainModel'

export class LoginRespositoryDynamoose implements ILoginRepository {
  async findByClientId(clientId: string): Promise<OutputLoginModel> {
    const [item] = await MainModel.query({ pk: 'client', sk: `clientId#${clientId}` }).exec()
    return OutputLoginModel.mapper(item)
  }
}
