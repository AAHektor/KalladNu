using System.Text;
using api.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Missing DefaultConnection connection string.");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    if (connectionString.Contains("Data Source=", StringComparison.OrdinalIgnoreCase))
    {
        options.UseSqlite(connectionString);
    }
    else
    {
        options.UseSqlServer(connectionString);
    }
});

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

var jwtKey = builder.Configuration["Jwt:Key"] ?? "dev_secret_change_this_please_update";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "kalladappen";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "kalladappen_users";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        var allowedOrigins = builder.Configuration
            .GetSection("Cors:AllowedOrigins")
            .Get<string[]>()
            ??
            [
                "http://localhost:5173",
                "https://localhost:5173",
                "http://10.5.0.2:5173",
                "https://10.5.0.2:5173",
                "https://brave-pond-07f977c03.7.azurestaticapps.net"
            ];

        policy.WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<api.Data.ApplicationDbContext>();
    db.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("Frontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
