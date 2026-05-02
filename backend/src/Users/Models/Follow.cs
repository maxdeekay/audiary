namespace Users;

public class Follow
{
    public required int FollowerId { get; set; }
    public User Follower { get; set; } = null!;
    public required int FollowingId { get; set; }
    public User Following { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
}
