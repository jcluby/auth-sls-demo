import { sign, verify } from 'jsonwebtoken'

type AuthRequest = {
  token: string
}

type AuthResponse = {
  error: boolean
  sub?: string
  message: string
}

type LoginRequest = {
  body: any
}

type LoginResponse = {
  error?: boolean
  token: string
}

export const authVerify = async (request: AuthRequest): Promise<AuthResponse> => {
  const { token } = request

  return new Promise<AuthResponse>((resolve, reject) => {
    try {
      verify(token, process.env.JWT_SECRET, (verifyError, decoded) => {
        if (verifyError) {
          return resolve({
            error: true,
            message: verifyError.message,
          })
        }

        return resolve(decoded as AuthResponse)
      })
    } catch (error) {
      return reject(error)
    }
  })
}

export const authLogin = async (request: LoginRequest): Promise<LoginResponse> => {
  const { body } = request

  return new Promise<LoginResponse>((resolve, reject) => {
    try {
      sign(body, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) return reject(err)
        return resolve({ token })
      })
    } catch (error) {
      return reject(error)
    }
  })
}
