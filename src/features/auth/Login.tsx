import LoginForm from "./components/LoginForm"
import waveicon from './assets/waveicon.svg'

const Login = () => {
  return (
    <div>
        <div className="flex flex-col items-center pb-6">
            <img src={waveicon} alt="Wave Icon" className="w-16 h-16 mb-4" />
            <h2 className="font-semibold text-xl">Logga in</h2>
        </div>

        <LoginForm />

        <div className='flex flex-col items-center pt-4'>
            <p>Har du inget konto? <span className='text-blue-700 font-semibold'>Skapa konto</span></p>
        </div>
    </div>
  )
}

export default Login
