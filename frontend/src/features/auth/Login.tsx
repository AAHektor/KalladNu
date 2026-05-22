import { Link } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import waveicon from './assets/waveicon.svg'

const Login = () => {
  return (
    <>
      <div className="block md:hidden">
        <div>
          <div className="flex flex-col items-center pb-6">
            <img src={waveicon} alt="Wave Icon" className="w-16 h-16 mb-4" />
            <h2 className="font-semibold text-xl">Logga in</h2>
          </div>

          <LoginForm />

          <div className='flex flex-col items-center pt-4'>
            <p>Har du inget konto? <Link to="/register" className='text-blue-700 font-semibold hover:underline'>Skapa konto</Link></p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex min-h-screen items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden grid grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-4 p-10 bg-gradient-to-br from-indigo-600 to-indigo-400 text-white">
            <img src={waveicon} alt="Wave Icon" className="w-20 h-20" />
            <h2 className="font-semibold text-2xl">Logga in</h2>
            <p className="text-sm max-w-xs text-indigo-100 text-center">Logga in för att hantera din tidrapportering</p>
          </div>

          <div className="p-10 flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
              <LoginForm />
              <div className='flex flex-col items-center pt-4'>
                <p>Har du inget konto? <Link to="/register" className='text-blue-700 font-semibold hover:underline'>Skapa konto</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
