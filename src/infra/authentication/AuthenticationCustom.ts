import { verify } from 'jsonwebtoken'

type AuthRequest = {
  token: string
}

type AuthResponse = {
  error: boolean
  sub?: string
  message: string
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
