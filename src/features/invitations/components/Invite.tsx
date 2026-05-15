import React from 'react'
import { Calendar, Clock, CircleUser, Check } from 'lucide-react'

const Invite = () => {
  return (
    <div className='bg-white p-4 rounded-xl shadow-md mt-6'>
        <div>
            <div className='flex flex-row justify-between'>
                <h4 className='text-blue-700 font-semibold'>Ny förfrågan</h4>
                <span className='px-3 py-1 bg-orange-200 rounded-full'>Pending</span>
            </div>
            <p className='text-xl font-semibold'>Personalmöte Q4</p>
        </div>
        <span className='flex h-[1px] w-full bg-gray-200 my-4'></span>
        <div className='flex flex-full flex-row justify-between'>
            <div className='flex flex-row items-center justify-between'>
                <Calendar size={20} className='text-gray-400 mr-2' />
                <p className='text-md text-gray-500'>15 Okt 2026</p>
            </div>
            <div className='flex flex-row items-center'>
                <Clock size={20} className='text-gray-400 mr-2' />
                <p className='text-md text-gray-500'>09:00 - 10:30</p>
            </div>
        </div>
        <span className='flex h-[1px] w-full bg-gray-200 my-4'></span>
        <div className='flex flex-full flex-row justify-between'>
            <div className='flex flex-row items-center justify-between'>
                <CircleUser size={40} className='text-gray-400 mr-4' />
                <div className=''>
                    <p className='text-sm text-gray-500'>AVSÄNDARE</p>
                    <p className='text-lg font-semibold'>Aron Hektor</p>
                </div>
            </div>
            <div className='flex gap-4'>
                <button className='bg-red-300 w-12 h-12 rounded-lg'><p className='text-red-500 font-semibold text-2xl'>X</p></button>
                <button className='bg-blue-700 w-12 h-12 rounded-lg flex items-center justify-center'><Check className='text-white font-semibold text-2xl'/></button>
            </div>
        </div>

    </div>
  )
}

export default Invite