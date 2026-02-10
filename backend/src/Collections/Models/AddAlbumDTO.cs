namespace Collections;

public class AddAlbumDTO
{
    public required string MusicBrainzId { get; set; }
    public required string Title { get; set; }
    public required string Artist { get; set; }
    public string? CoverUrl { get; set; }
    public string? Genre { get; set; }
    public int ReleaseYear { get; set; }
}
