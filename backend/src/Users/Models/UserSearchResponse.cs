namespace Users;

public class UserSearchResponse
{
    public int Id { get; set; }
    public required string Username { get; set; }
    public bool IsFollowing { get; set; }
}