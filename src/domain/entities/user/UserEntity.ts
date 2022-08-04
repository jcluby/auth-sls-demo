import { Entity } from '@core/domain/Entity'
import { IError } from '@core/error/IError'
import { Either, left, right } from '@core/logic/Either'
import { InvalidEmailDomainError } from './User.error'

interface IUserProps {
  name: string
  lastname: string
  email: string
}

export class UserEntity extends Entity<IUserProps> {
  private constructor(props: IUserProps, id?: string) {
    super(props, id)
  }

  static create(props: IUserProps, id?: string): Either<IError, UserEntity> {
    const user = new UserEntity(props, id)
    if (!this.validateEmail(user.props.email)) {
      return left(InvalidEmailDomainError)
    }

    return right(user)
  }

  private static validateEmail(email: string): boolean {
    if (!email || email.trim().length > 255) {
      return false
    }
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!regex.test(email)) {
      return false
    }
    return true
  }
}
