import React from 'react'

const RegisterForm = () => {
  return (
    <div className='bg-white outline-1 outline-gray-50 rounded-xl px-6 py-8'>
        <form>
            <div className='mb-4'>
                <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Fullständigt namn</label>
                <input type="email" id="email" className='mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm' />
            </div>
            <div className='mb-4'>
                <label htmlFor="email" className='block text-sm font-medium text-gray-700'>E-postadress</label>
                <input type="email" id="email" className='mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm' />
            </div>
            <div className='mb-4'>
                <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Lösenord</label>
                <input type="password" id="password" className='mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm' />
            </div>
             <div className='flex items-center mt-4 mb-4'>
                <input id="remember-me" name="remember-me" type="checkbox" className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded' />
                <label htmlFor="remember-me" className='ml-2 block text-sm text-gray-900'>Jag godkänner Användarvillkoren och Integritetspolicyn.</label>
            </div>
            
            <button type="submit" className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>Skapa konto</button>

        </form>

    </div>
  )
}

export default RegisterForm