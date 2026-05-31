import { useEffect, useState } from 'react'
import Invite from './components/Invite'
import { getReceivedInvitations, respondInvitation, type Invitation } from '../../services/invitations'

const Invitations = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadInvitations = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await getReceivedInvitations()
        setInvitations(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Kunde inte hämta inbjudningar.')
      } finally {
        setLoading(false)
      }
    }

    loadInvitations()
  }, [])

  const handleResponse = async (id: string, status: 'Accepted' | 'Declined' | 'Maybe') => {
    try {
      await respondInvitation(id, status)
      setInvitations((current) =>
        current.map((invite) =>
          invite.id === id
            ? { ...invite, recipientStatus: status }
            : invite
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunde inte skicka svar.')
    }
  }

  return (
    <div>
      <h2 className="font-black text-xl pb-4">Mina inbjudningar</h2>
      {loading && <p>Hämtar kallelser...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && invitations.length === 0 && <p>Du har inga inbjudningar just nu.</p>}
      {invitations.map((invite) => (
        <Invite key={invite.id} invite={invite} onRespond={handleResponse} />
      ))}
    </div>
  )
}

export default Invitations
