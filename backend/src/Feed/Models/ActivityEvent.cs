using Collections;
using Albums;
using Users;

namespace Feed;

public class ActivityEvent
{
    public int Id { get; set; }
    public required int UserId { get; set; }
    public User User { get; set; } = null!;
    public required ActivityEventType Type { get; set; }
    public int CollectionAlbumId { get; set; }
    public CollectionAlbum CollectionAlbum { get; set; } = null!;
    public decimal? Rating { get; set; }
    public string? Comment { get; set; }
    public required DateTime CreatedAt { get; set; }
}

public enum ActivityEventType
{
    AlbumAdded = 0,
    RatingChanged = 1,
    CommentChanged = 2
}