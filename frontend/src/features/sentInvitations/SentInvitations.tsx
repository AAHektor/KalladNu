import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, Plus } from 'lucide-react'
import { getSentInvitations, type Invitation } from '../../services/invitations'

const SentInvitations: React.FC = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const loadInvitations = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await getSentInvitations()
        setInvitations(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Kunde inte hämta skickade kallelser.')
      } finally {
        setLoading(false)
      }
    }

    loadInvitations()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 font-sans text-slate-900 relative">
      <div className="max-w-xl md:max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Skickade kallelser</h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Hantera och följ upp dina utskickade inbjudningar.
            </p>
          </div>
          <button
            onClick={() => navigate('/sendInvite')}
            className="hidden md:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-2xl shadow-sm shadow-indigo-100 transition-all active:scale-[0.98] cursor-pointer text-sm"
          >
            <Plus size={18} strokeWidth={2.5} />
            Skapa ny kallelse
          </button>
        </div>

        <div className="flex gap-2 mb-8">
          {['alla', 'kommande', 'avslutade'].map((item) => (
            <button
              key={item}
              className="px-5 py-2 rounded-full text-xs font-bold tracking-wide capitalize bg-gray-100 text-gray-500 hover:bg-gray-200/70"
            >
              {item}
            </button>
          ))}
        </div>

        {loading && <p>Hämtar skickade kallelser...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && invitations.length === 0 && <p>Du har inga skickade kallelser ännu.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {invitations.map((invite) => (
            <div key={invite.id} className="bg-white rounded-4xl p-6 shadow-sm border border-gray-100/80 flex flex-col justify-between transition-all overflow-hidden">
              <div>
                <div className="flex justify-between items-start gap-3 mb-4">
                  <h3 className="text-lg font-bold text-slate-800 leading-tight">{invite.title}</h3>
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full shrink-0 bg-indigo-100 text-indigo-700">
                    {invite.respondedCount}/{invite.totalRecipients} svarade
                  </span>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{new Date(invite.scheduledAt).toLocaleDateString('sv-SE')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                    <Clock size={16} className="text-gray-400" />
                    <span>{new Date(invite.scheduledAt).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between gap-2">
                  <span>Accepterade</span>
                  <strong>{invite.acceptedCount}</strong>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>Avböjda</span>
                  <strong>{invite.declinedCount}</strong>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>Kanske</span>
                  <strong>{invite.maybeCount}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => navigate('/sendInvite')}
        className="md:hidden fixed bottom-6 right-6 z-[70] bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-2xl shadow-xl shadow-indigo-200 transition-all active:scale-90 cursor-pointer"
      >
        <Plus size={28} strokeWidth={2.5} />
      </button>
    </div>
  )
}

export default SentInvitations
