import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Send, FileText, Info, X } from 'lucide-react'
import { createInvitation } from '../../services/invitations'

const SendInvite: React.FC = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')
  const [location, setLocation] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [emails, setEmails] = useState<string[]>([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const addEmail = (value: string) => {
    const email = value.trim()
    if (!email) return
    if (emails.includes(email)) return
    setEmails((current) => [...current, email])
  }

  const removeEmail = (emailToRemove: string) => {
    setEmails((current) => current.filter((email) => email !== emailToRemove))
  }

  const handleEmailKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addEmail(emailInput)
      setEmailInput('')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!title.trim()) {
      setError('Titel krävs.')
      return
    }

    if (!scheduledAt) {
      setError('Tid och datum krävs.')
      return
    }

    if (emails.length === 0) {
      setError('Lägg till minst en e-postadress.')
      return
    }

    setLoading(true)

    try {
      await createInvitation({
        title,
        description,
        scheduledAt: new Date(scheduledAt).toISOString(),
        location,
        recipients: emails,
      })
      setSuccess('Kallelsen skickades.')
      navigate('/sentInvitations')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunde inte skicka kallelsen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-16 font-sans text-slate-900">
      <div className="max-w-xl mx-auto px-6 pt-6">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Skapa ny inbjudan</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Fyll i detaljerna för att kalla personal eller deltagare till ett nytt pass.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-gray-100 mb-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Titel
              </label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                type="text"
                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Beskrivning
              </label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                placeholder="Beskriv syftet med kallelsen..."
                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium resize-none placeholder:text-gray-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Tid & Datum
                </label>
                <div className="relative">
                  <input
                    value={scheduledAt}
                    onChange={(event) => setScheduledAt(event.target.value)}
                    type="datetime-local"
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-4 pr-10 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium text-gray-700"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Plats
                </label>
                <div className="relative">
                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    type="text"
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-4 pr-10 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium"
                  />
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Inbjudna (E-postadresser)
              </label>
              <div className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl p-4 space-y-3 overflow-hidden">
                <div className="flex flex-wrap gap-2 w-full">
                  {emails.map((email) => (
                    <div
                      key={email}
                      className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold pl-3 pr-1.5 py-1.5 rounded-xl flex items-center justify-between gap-1.5 min-w-0 max-w-full"
                    >
                      <span className="break-all block flex-1 pr-1">{email}</span>
                      <button
                        type="button"
                        onClick={() => removeEmail(email)}
                        className="hover:bg-indigo-100 p-0.5 rounded-md transition-colors text-indigo-400 hover:text-indigo-600 shrink-0"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  value={emailInput}
                  onChange={(event) => setEmailInput(event.target.value)}
                  onKeyDown={handleEmailKeyDown}
                  type="email"
                  placeholder="Lägg till e-post..."
                  className="w-full bg-transparent border-none outline-none p-0 text-sm font-medium placeholder:text-gray-400 focus:ring-0"
                />
              </div>
              <p className="mt-2 text-[11px] text-gray-400 italic">
                Tryck Enter eller komma efter varje adress.
              </p>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-emerald-600">{success}</p>}

            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-md shadow-indigo-100 disabled:opacity-60"
              >
                <Send size={18} /> {loading ? 'Skickar...' : 'Skicka kallelser'}
              </button>

              <button
                type="button"
                className="w-full bg-white hover:bg-gray-50 text-indigo-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all border-2 border-indigo-600 active:scale-[0.99]"
                onClick={() => setEmails([])}
              >
                <FileText size={18} /> Rensa adresser
              </button>
            </div>
          </form>
        </div>

        <div className="bg-orange-100/70 border border-orange-200/50 rounded-2xl p-5 flex gap-4 items-start">
          <div className="bg-orange-500 text-white p-1.5 rounded-lg mt-0.5 shrink-0">
            <Info size={16} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-orange-900 mb-0.5">Visste du?</h4>
            <p className="text-xs text-orange-800/90 leading-relaxed font-medium">
              Kallelser skickas omedelbart till angivna e-postadresser. Vyn för skickade kallelser visar sedan deras responsstatus.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendInvite
