export interface InputLoginModel {
  clientId: string
  clientSecret: string
  description: string
}

export class OutputLoginModel {
  clientId: string
  clientSecret: string
  description: string

  static mapper(entity: OutputLoginModel): OutputLoginModel {
    return {
      clientId: entity?.clientId,
      clientSecret: entity?.clientSecret,
      description: entity?.description,
    }
  }
}
