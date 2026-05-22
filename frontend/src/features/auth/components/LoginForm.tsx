import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockKeyhole, Mail } from 'lucide-react'
import { login } from '../../../services/auth'

const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    try {
      setLoading(true)
      const response = await login({ email, password })

      const storage = rememberMe ? localStorage : sessionStorage
      storage.setItem('authToken', response.token)
      storage.setItem('authUser', JSON.stringify(response.user))
      navigate('/dashboard')
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Kunde inte logga in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-white outline-1 outline-gray-50 rounded-xl px-6 py-8'>
      <div className='md:hidden flex flex-col items-center gap-2 pb-4'>
        <h2 className="font-semibold text-lg">Välkommen tillbaka</h2>
        <p className='text-sm'>Logga in för att hantera din tidrapportering</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='mb-4 relative'>
          <label htmlFor="email" className='block text-sm font-medium text-gray-700'>E-postadress</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className='mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 pl-10 pr-10 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            required
          />
          <Mail className='text-gray-400 absolute left-3 top-[33px]' size={20} />
        </div>
        <div className='mb-4 relative'>
          <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Lösenord</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className='mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 pl-10 pr-10 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            required
          />
          <LockKeyhole className='text-gray-400 absolute left-3 top-[33px]' size={20} />
        </div>
        <div className='flex items-center mt-4 mb-4'>
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
          />
          <label htmlFor="remember-me" className='ml-2 block text-sm text-gray-900'>Kom ihåg mig</label>
        </div>

        {error && <p className='mb-4 text-sm text-red-600'>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          {loading ? 'Loggar in...' : 'Logga in'}
        </button>
      </form>
    </div>
  )
}

export default LoginForm
