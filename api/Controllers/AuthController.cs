using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using api.DTOs;

namespace api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IConfiguration _config;

    public AuthController(UserManager<IdentityUser> userManager, IConfiguration config)
    {
        _userManager = userManager;
        _config = config;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto req)
    {
        var userName = string.IsNullOrWhiteSpace(req.Name) ? req.Email : req.Name;
        var user = new IdentityUser { UserName = userName, Email = req.Email };
        var result = await _userManager.CreateAsync(user, req.Password);
        if (!result.Succeeded)
        {
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
        }

        var token = GenerateToken(user);
        return Ok(new AuthResponse { Token = token, User = new UserDto { Id = user.Id, Name = user.UserName ?? string.Empty, Email = user.Email ?? string.Empty } });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto req)
    {
        var user = await _userManager.FindByEmailAsync(req.Email);
        if (user is null)
            return Unauthorized();

        if (!await _userManager.CheckPasswordAsync(user, req.Password))
            return Unauthorized();

        var token = GenerateToken(user);
        return Ok(new AuthResponse { Token = token, User = new UserDto { Id = user.Id, Name = user.UserName ?? string.Empty, Email = user.Email ?? string.Empty } });
    }

    private string GenerateToken(IdentityUser user)
    {
        var key = _config["Jwt:Key"] ?? "dev_secret_change_this";
        var issuer = _config["Jwt:Issuer"] ?? "kalladappen";
        var audience = _config["Jwt:Audience"] ?? "kalladappen_users";

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Email, user.Email ?? string.Empty),
            new(ClaimTypes.Name, user.UserName ?? string.Empty)
        };

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var creds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(issuer, audience, claims, expires: DateTime.UtcNow.AddDays(7), signingCredentials: creds);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
