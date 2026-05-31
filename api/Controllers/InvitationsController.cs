using System.Security.Claims;
using api.Data;
using api.DTOs;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("api/invitations")]
public class InvitationsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly ILogger<InvitationsController> _logger;

    public InvitationsController(
        ApplicationDbContext context,
        UserManager<IdentityUser> userManager,
        ILogger<InvitationsController> logger)
    {
        _context = context;
        _userManager = userManager;
        _logger = logger;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] CreateInvitationDto request)
    {
        if (request is null)
        {
            return BadRequest(new { errors = new[] { "Request body kan inte vara tom." } });
        }

        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return BadRequest(new { errors = new[] { "Titel krävs." } });
        }

        if (request.ScheduledAt == default)
        {
            return BadRequest(new { errors = new[] { "Tid och datum krävs." } });
        }

        if (request.Recipients is null || !request.Recipients.Any())
        {
            return BadRequest(new { errors = new[] { "Minst en mottagare krävs." } });
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var user = await _userManager.FindByIdAsync(userId);
        if (user is null)
        {
            return Unauthorized();
        }

        var invitation = new Invitation
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Description = request.Description,
            ScheduledAt = request.ScheduledAt,
            Location = request.Location,
            SenderId = user.Id,
            SenderName = user.UserName ?? user.Email ?? string.Empty,
            Status = InvitationStatus.Pending,
            Recipients = request.Recipients
                .Where(email => !string.IsNullOrWhiteSpace(email))
                .Select(email => new InvitationRecipient
                {
                    Id = Guid.NewGuid(),
                    Email = email.Trim(),
                    Status = InvitationStatus.Pending,
                })
                .ToList(),
        };

        _context.Invitations.Add(invitation);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = invitation.Id }, new { id = invitation.Id });
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<InvitationDto>>> GetReceived()
    {
        var email = User.FindFirstValue(ClaimTypes.Email);
        if (string.IsNullOrEmpty(email))
        {
            return Unauthorized();
        }

        var invitations = await _context.Invitations
            .Include(i => i.Recipients)
            .Where(i => i.Recipients.Any(r => r.Email == email))
            .ToListAsync();

        return Ok(invitations.Select(i => MapInvitation(i, email)));
    }

    [HttpGet("sent")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<InvitationDto>>> GetSent()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var invitations = await _context.Invitations
            .Include(i => i.Recipients)
            .Where(i => i.SenderId == userId)
            .ToListAsync();

        return Ok(invitations.Select(i => MapInvitation(i, string.Empty)));
    }

    [HttpGet("{id:guid}")]
    [Authorize]
    public async Task<ActionResult<InvitationDto>> GetById(Guid id)
    {
        var invitation = await _context.Invitations
            .Include(i => i.Recipients)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (invitation is null)
        {
            return NotFound();
        }

        var email = User.FindFirstValue(ClaimTypes.Email) ?? string.Empty;
        return Ok(MapInvitation(invitation, email));
    }

    [HttpPost("{id:guid}/respond")]
    [Authorize]
    public async Task<IActionResult> Respond(Guid id, [FromBody] RespondInvitationDto request)
    {
        if (request is null || string.IsNullOrWhiteSpace(request.Status))
        {
            return BadRequest(new { errors = new[] { "Status krävs." } });
        }

        if (!Enum.TryParse<InvitationStatus>(request.Status, true, out var parsedStatus))
        {
            return BadRequest(new { errors = new[] { "Ogiltig status." } });
        }

        var email = User.FindFirstValue(ClaimTypes.Email);
        if (string.IsNullOrEmpty(email))
        {
            return Unauthorized();
        }

        var invitation = await _context.Invitations
            .Include(i => i.Recipients)
            .FirstOrDefaultAsync(i => i.Id == id && i.Recipients.Any(r => r.Email == email));

        if (invitation is null)
        {
            return NotFound();
        }

        var recipient = invitation.Recipients.First(r => r.Email == email);
        recipient.Status = parsedStatus;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static InvitationDto MapInvitation(Invitation invitation, string currentUserEmail)
    {
        var matchedRecipient = invitation.Recipients.FirstOrDefault(r => r.Email == currentUserEmail);
        var recipientStatus = matchedRecipient?.Status.ToString() ?? InvitationStatus.Pending.ToString();

        var acceptedCount = invitation.Recipients.Count(r => r.Status == InvitationStatus.Accepted);
        var declinedCount = invitation.Recipients.Count(r => r.Status == InvitationStatus.Declined);
        var maybeCount = invitation.Recipients.Count(r => r.Status == InvitationStatus.Maybe);
        var respondedCount = invitation.Recipients.Count(r => r.Status != InvitationStatus.Pending);

        return new InvitationDto
        {
            Id = invitation.Id,
            Title = invitation.Title,
            Description = invitation.Description,
            ScheduledAt = invitation.ScheduledAt,
            Location = invitation.Location,
            SenderName = invitation.SenderName,
            RecipientStatus = recipientStatus,
            TotalRecipients = invitation.Recipients.Count,
            RespondedCount = respondedCount,
            AcceptedCount = acceptedCount,
            DeclinedCount = declinedCount,
            MaybeCount = maybeCount,
            Recipients = invitation.Recipients.Select(r => new InvitationRecipientDto
            {
                Email = r.Email,
                Status = r.Status.ToString()
            }).ToList()
        };
    }
}
