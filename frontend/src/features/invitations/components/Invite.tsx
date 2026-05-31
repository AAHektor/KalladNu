import { Calendar, CircleUser, Check, X } from 'lucide-react'
import type { Invitation } from '../../../services/invitations'

type InviteProps = {
  invite: Invitation
  onRespond: (id: string, status: 'Accepted' | 'Declined' | 'Maybe') => void
}

const Invite = ({ invite, onRespond }: InviteProps) => {
  const statusColor = invite.recipientStatus === 'Accepted' ? 'bg-green-100 text-green-700'
    : invite.recipientStatus === 'Declined' ? 'bg-red-100 text-red-700'
    : invite.recipientStatus === 'Maybe' ? 'bg-amber-100 text-amber-700'
    : 'bg-orange-100 text-orange-700'

  return (
    <div className="bg-white p-4 rounded-4xl shadow-md mt-6">
      <div className="flex flex-row justify-between items-start gap-4">
        <div>
          <h4 className="text-blue-700 font-semibold">Ny förfrågan</h4>
          <p className="text-xl font-semibold">{invite.title}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
          {invite.recipientStatus}
        </span>
      </div>

      <div className="my-4 h-px bg-gray-200" />

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Calendar size={18} className="text-gray-400" />
          <span>{new Date(invite.scheduledAt).toLocaleString('sv-SE', { dateStyle: 'medium', timeStyle: 'short' })}</span>
        </div>
        {invite.location ? (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPinIcon />
            <span>{invite.location}</span>
          </div>
        ) : null}
      </div>

      <div className="my-4 h-px bg-gray-200" />

      <div className="flex flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <CircleUser size={40} className="text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Avsändare</p>
            <p className="text-lg font-semibold">{invite.senderName}</p>
          </div>
        </div>

        {invite.recipientStatus === 'Pending' ? (
          <div className="flex gap-3">
            <button
              onClick={() => onRespond(invite.id, 'Declined')}
              className="bg-red-300 w-12 h-12 rounded-lg flex items-center justify-center text-red-700 hover:bg-red-400 transition-colors"
            >
              <X size={20} />
            </button>
            <button
              onClick={() => onRespond(invite.id, 'Maybe')}
              className="bg-yellow-300 w-12 h-12 rounded-lg flex items-center justify-center text-amber-800 hover:bg-yellow-400 transition-colors"
            >
              ?
            </button>
            <button
              onClick={() => onRespond(invite.id, 'Accepted')}
              className="bg-blue-700 w-12 h-12 rounded-lg flex items-center justify-center text-white hover:bg-blue-800 transition-colors"
            >
              <Check size={20} />
            </button>
          </div>
        ) : (
          <div className="rounded-2xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
            Ditt svar: {invite.recipientStatus}
          </div>
        )}
      </div>
    </div>
  )
}

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 13.25 10.34 19.47 11.2 20.42C11.54 20.82 12.06 20.82 12.4 20.42C13.27 19.47 18.6 13.25 18.6 9C18.6 5.13 15.47 2 11.6 2H12Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" fill="currentColor" />
  </svg>
)

export default Invite
