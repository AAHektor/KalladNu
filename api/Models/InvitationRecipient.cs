namespace api.Models;

public record InvitationRecipient
{
    public string Email { get; init; } = string.Empty;
    public InvitationStatus Status { get; init; }
}
