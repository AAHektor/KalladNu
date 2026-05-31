using System;
using System.Collections.Generic;

namespace api.DTOs;

public class InvitationDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime ScheduledAt { get; set; }
    public string? Location { get; set; }
    public string SenderName { get; set; } = string.Empty;
    public string RecipientStatus { get; set; } = string.Empty;
    public int TotalRecipients { get; set; }
    public int RespondedCount { get; set; }
    public int AcceptedCount { get; set; }
    public int DeclinedCount { get; set; }
    public int MaybeCount { get; set; }
    public List<InvitationRecipientDto> Recipients { get; set; } = new();
}
