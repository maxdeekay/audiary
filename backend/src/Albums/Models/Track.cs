namespace Albums;

public class Track
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public int? Position { get; set; }
    public int? Length { get; set; }
    public required int AlbumId { get; set; }
    public required Album Album { get; set; }
}