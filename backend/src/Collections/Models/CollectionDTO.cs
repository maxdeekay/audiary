namespace Collections;

public class CollectionDTO
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public List<CollectionAlbumDTO> Albums { get; set; } = [];
    public required DateTime CreatedAt { get; set; }
}

public class CollectionAlbumDTO
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
    public List<FavouriteSongDTO> FavouriteSongs { get; set; } = [];
    public required DateTime AddedAt { get; set; }
}

public class FavouriteSongDTO
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int Position { get; set; }
}
