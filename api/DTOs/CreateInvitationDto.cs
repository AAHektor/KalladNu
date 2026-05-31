using System;
using System.Collections.Generic;

namespace api.DTOs;

public class CreateInvitationDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime ScheduledAt { get; set; }
    public string? Location { get; set; }
    public List<string> Recipients { get; set; } = new();
}
