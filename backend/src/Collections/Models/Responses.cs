namespace Collections;

public class CollectionSummaryResponse
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public int AlbumCount { get; set; }
    public required DateTime CreatedAt { get; set; }
}

public class CollectionDetailResponse
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public List<CollectionAlbumResponse> Albums { get; set; } = [];
    public required DateTime CreatedAt { get; set; }
}

public class CollectionAlbumResponse
{
    public int Id { get; set; }
    public int AlbumId { get; set; }
    public required string MusicBrainzId { get; set; }
    public required string Title { get; set; }
    public required string Artist { get; set; }
    public string? CoverUrl { get; set; }
    public string? Genre { get; set; }
    public int ReleaseYear { get; set; }
    public decimal? Rating { get; set; }
    public int Position { get; set; }
    public required DateTime AddedAt { get; set; }
}

public class CollectionAlbumDetailResponse
{
    public int Id { get; set; }
    public int AlbumId { get; set; }
    public required string MusicBrainzId { get; set; }
    public required string Title { get; set; }
    public required string Artist { get; set; }
    public string? CoverUrl { get; set; }
    public string? Genre { get; set; }
    public int ReleaseYear { get; set; }
    public decimal? Rating { get; set; }
    public int Position { get; set; }
    public string? Comment { get; set; }
    public List<TrackResponse> Tracks { get; set; } = [];
    public List<FavouriteSongResponse> FavouriteSongs { get; set; } = [];
    public required DateTime AddedAt { get; set; }
}

public class TrackResponse
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public int Position { get; set; }
    public int? Length { get; set; }
}

public class FavouriteSongResponse
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int Position { get; set; }
}
