using Collections;

namespace Users;

public class User
{
    public int Id { get; set; }
    public required string Username { get; set; }
    public required string PasswordHash { get; set; }
    public string? Email { get; set; }
    public Role Role { get; set; } = Role.User;
    public List<Collection> Collections { get; set; } = [];
    public DateTime CreatedAt { get; set; }
}

public enum Role
{
    User = 0,
    Moderator = 1,
    Admin = 2
}
