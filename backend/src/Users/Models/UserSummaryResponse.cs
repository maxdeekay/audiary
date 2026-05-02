namespace Users;

public class UserSummaryResponse
{
    public int Id { get; set; }
    public required string Username { get; set; }
    public DateTime FollowedAt { get; set; }
}