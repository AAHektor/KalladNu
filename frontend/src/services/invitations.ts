import { apiFetch } from './auth';

export type InvitationRecipient = {
  email: string;
  status: string;
};

export type Invitation = {
  id: string;
  title: string;
  description?: string;
  scheduledAt: string;
  location?: string;
  senderName: string;
  recipientStatus: string;
  totalRecipients: number;
  respondedCount: number;
  acceptedCount: number;
  declinedCount: number;
  maybeCount: number;
  recipients: InvitationRecipient[];
};

export type CreateInvitationRequest = {
  title: string;
  description?: string;
  scheduledAt: string;
  location?: string;
  recipients: string[];
};

export const createInvitation = (request: CreateInvitationRequest) =>
  apiFetch<{ id: string }>('/api/invitations', {
    method: 'POST',
    body: JSON.stringify(request),
  });

export const getReceivedInvitations = () => apiFetch<Invitation[]>('/api/invitations');
export const getSentInvitations = () => apiFetch<Invitation[]>('/api/invitations/sent');

export const respondInvitation = (id: string, status: 'Accepted' | 'Declined' | 'Maybe') =>
  apiFetch(`/api/invitations/${id}/respond`, {
    method: 'POST',
    body: JSON.stringify({ status }),
  });
