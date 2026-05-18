import RegisterForm from './components/RegisterForm'
import waveicon from './assets/waveicon.svg'

const Register = () => {
  return (
    <>
      <div className="block md:hidden">
        <div className=''>
          <div className='flex flex-col items-center gap-2 pb-4'>
            <img src={waveicon} alt="" className='w-16 h-16 mb-4' />
            <h2 className="font-semibold text-lg">Skapa ditt konto</h2>
            <p className='text-sm'>Logga in för att hantera din tidrapportering</p>
          </div>
          <RegisterForm/>
        </div>
      </div>

      <div className="hidden md:flex min-h-screen items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden grid grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-4 p-10 bg-gradient-to-br from-indigo-600 to-indigo-400 text-white">
            <img src={waveicon} alt="" className="w-20 h-20" />
            <h2 className="font-semibold text-2xl">Skapa ditt konto</h2>
            <p className="text-sm max-w-xs text-indigo-100 text-center">Logga in för att hantera din tidrapportering</p>
          </div>

          <div className="p-10 flex items-center justify-center">
            <div className="w-full max-w-md">
                <RegisterForm/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register