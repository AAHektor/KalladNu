using System;

namespace api.Models;

public class InvitationRecipient
{
    public Guid Id { get; set; }
    public Guid InvitationId { get; set; }
    public Invitation? Invitation { get; set; }
    public string Email { get; set; } = string.Empty;
    public InvitationStatus Status { get; set; }
}
