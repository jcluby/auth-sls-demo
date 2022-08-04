import { clientError, HttpResponse, ok } from '@infra/http/HttpResponse'
import { CreateUserUseCase } from '.'

type CreateUserRequest = {
  id?: string
  name: string
  lastname: string
  email: string
}

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: CreateUserRequest): Promise<HttpResponse> {
    const { id, email, lastname, name } = request

    const result = await this.createUserUseCase.execute({
      id,
      email,
      lastname,
      name,
    })

    if (result.isLeft()) {
      return clientError(new Error(result.value.message))
    }

    return ok({ id: result })
  }
}
