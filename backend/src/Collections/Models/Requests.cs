namespace Collections;

public class CreateCollectionRequest
{
    public required string Name { get; set; }
    public string? Description { get; set; }
}

public class AddAlbumRequest
{
    public required string MusicBrainzId { get; set; }
    public required string Title { get; set; }
    public required string Artist { get; set; }
    public string? CoverUrl { get; set; }
    public string? Genre { get; set; }
    public int ReleaseYear { get; set; }
    public string? MusicBrainzReleaseId { get; set; }
}

public class UpdateCollectionAlbumRequest
{
    public decimal? Rating { get; set; }
    public string? Comment { get; set; }
}
