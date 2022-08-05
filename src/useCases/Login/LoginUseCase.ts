import { ILoginRepository } from '@application/repositories/ILoginRepository'
import { IError } from '@core/error/IError'
import { Either, left, right } from '@core/logic/Either'
import { LoginUseCaseErrorClientId, LoginUseCaseErrorCredential } from './Login.error'

export class LoginUseCase {
  constructor(private loginRespository: ILoginRepository) {}

  async execute(auth: string): Promise<Either<IError, string>> {
    const [type, credential] = auth.split(' ')

    const checkTypeBasic = type.toLowerCase() === 'basic'

    if (!checkTypeBasic || !credential) return left(LoginUseCaseErrorCredential)

    // TODO: use helper
    const buffCredential = Buffer.from(credential, 'base64')
    const decodeCredential = buffCredential.toString('ascii')

    const [clientId, secret] = decodeCredential.split(':')

    if (!clientId || !secret) return left(LoginUseCaseErrorCredential)

    const client = await this.loginRespository.findByClientId(clientId)

    if (!client.clientId || client.clientSecret !== secret) {
      return left(LoginUseCaseErrorClientId)
    }

    return right(client.clientId)
  }
}
