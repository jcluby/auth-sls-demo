export interface InputUserModel {
  id: string
  name: string
  email: string
  lastname: string
}

export class OutputUserModel {
  id: string
  name: string
  email: string
  lastname: string

  static mapper(entity: OutputUserModel): OutputUserModel {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      lastname: entity.lastname,
    }
  }
}
