using System;
using System.Collections.Generic;

namespace api.Models;

public class Invitation
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime ScheduledAt { get; set; }
    public string? Location { get; set; }
    public string SenderId { get; set; } = string.Empty;
    public string SenderName { get; set; } = string.Empty;
    public InvitationStatus Status { get; set; }
    public List<InvitationRecipient> Recipients { get; set; } = new();
}
