export type AuthUser = {
  id: string
  name: string
  email: string
}

export type AuthResponse = {
  token: string
  user: AuthUser
}

export type RegisterRequest = {
  name: string
  email: string
  password: string
}

export type LoginRequest = {
  email: string
  password: string
}

const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5277'

async function postAuth<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    let errorMessage = 'Något gick fel.'

    try {
      const errorBody = await response.json() as { errors?: string[] }
      if (Array.isArray(errorBody.errors) && errorBody.errors.length > 0) {
        errorMessage = errorBody.errors.join(', ')
      }
    } catch {
      errorMessage = response.statusText || errorMessage
    }

    throw new Error(errorMessage)
  }

  return response.json() as Promise<T>
}

export const register = (request: RegisterRequest) => postAuth<AuthResponse>('/api/auth/register', request)

export const login = (request: LoginRequest) => postAuth<AuthResponse>('/api/auth/login', request)

const getStoredValue = (key: string): string | null => localStorage.getItem(key) ?? sessionStorage.getItem(key)

export const getStoredAuthUser = (): AuthUser | null => {
  const rawUser = getStoredValue('authUser')

  if (!rawUser) {
    return null
  }

  try {
    return JSON.parse(rawUser) as AuthUser
  } catch {
    return null
  }
}

export const getStoredAuthToken = (): string | null => getStoredValue('authToken')

export const isAuthenticated = (): boolean => Boolean(getStoredAuthToken())

export const clearAuth = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('authUser')
  sessionStorage.removeItem('authToken')
  sessionStorage.removeItem('authUser')
}
