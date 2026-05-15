import RegisterForm from './components/RegisterForm'
import waveicon from './assets/waveicon.svg'

const Register = () => {
  return (
    <div className=''>
        <div className='flex flex-col items-center gap-2 pb-4'>
            <img src={waveicon} alt="" className='w-16 h-16 mb-4' />
            <h2 className="font-semibold text-lg">Skapa ditt konto</h2>
            <p className='text-sm'>Logga in för att hantera din tidrapportering</p>
        </div>
        <RegisterForm/>
    </div>
  )
}

export default Register