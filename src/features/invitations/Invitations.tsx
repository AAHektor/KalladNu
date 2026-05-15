import React from 'react'
import Invite from './components/Invite'

const Invitations = () => {
  return (
    <div>
        <h2 className='font-black text-xl pb-4'>Mina inbjudningar</h2>
        <p>Du har 3 nya inbjudningar som väntar på svar</p>

        <Invite />
        <Invite />
        <Invite />

    </div>
  )
}

export default Invitations