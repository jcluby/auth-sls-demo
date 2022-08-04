import { UserEntity } from './UserEntity'

describe('Domain Entity - UserEntity', () => {
  test('should create user', () => {
    const user = UserEntity.create({
      email: 'jose@app.com',
      name: 'jose',
      lastname: 'batista',
    })

    expect(user.isLeft()).toBeFalsy()
    if (user.isRight()) {
      expect(user.value.id).toBeDefined()
    }
  })

  test('should create a user with invalid email', () => {
    const user = UserEntity.create({
      email: 'jose',
      name: 'jose',
      lastname: 'batista',
    })

    expect(user.isRight()).toBeFalsy()
    if (user.isLeft()) {
      expect(user.value.message).toBe('Invalid email')
    }
  })
})
