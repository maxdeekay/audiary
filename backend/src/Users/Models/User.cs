using Collections;

namespace Users;

public class User
{
    public int Id { get; set; }
    public required string Username { get; set; }
    public required string PasswordHash { get; set; }
    public List<Collection> Collections { get; set; } = [];
    public DateTime CreatedAt { get; set; }
}
