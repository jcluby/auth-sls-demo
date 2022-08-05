import { authLogin } from '@infra/authentication'
import { clientError, HttpResponse, ok } from '@infra/http/HttpResponse'
import { LoginUseCase } from '.'

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(auth: string): Promise<HttpResponse> {
    if (!auth) return clientError(new Error('unauthorized'))

    const result = await this.loginUseCase.execute(auth)

    if (result.isLeft()) {
      return clientError(new Error(result.value.message))
    }

    const token = await authLogin({ body: { clientId: result.value, sub: result.value } })

    if (!token) clientError(new Error('error token'))

    return ok({ token: token.token })
  }
}
