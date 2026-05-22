using System;
using System.Collections.Generic;

namespace api.Models;

public record Group
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Code { get; init; } = string.Empty;
    public List<Guid> MemberIds { get; init; } = new();
}
