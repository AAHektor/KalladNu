using System;
using System.Collections.Generic;

namespace api.Models;

public record Invitation
{
    public Guid Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string? Description { get; init; }
    public DateTime ScheduledAt { get; init; }
    public string? Location { get; init; }
    public Guid SenderId { get; init; }
    public Guid? GroupId { get; init; }
    public InvitationStatus Status { get; init; }
    public List<InvitationRecipient> Recipients { get; init; } = new();
}
