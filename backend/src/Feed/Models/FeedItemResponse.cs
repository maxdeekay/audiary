namespace Feed;

public class FeedItemResponse
{
    public int Id { get; set; }
    public required ActivityEventType Type { get; set; }
    public required DateTime CreatedAt { get; set; }

    public required int UserId { get; set; }
    public required string Username { get; set; }

    public int CollectionId { get; set; }
    public required string CollectionName { get; set; }

    public int CollectionAlbumId { get; set; }

    public int AlbumId { get; set; }
    public required string AlbumTitle { get; set; }
    public required string AlbumArtist { get; set; }
    public string? AlbumCoverUrl { get; set; }
    public int ReleaseYear { get; set; }

    public decimal? Rating { get; set; }
    public string? Comment { get; set; }
}