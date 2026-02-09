namespace Genres;

public class Genre
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public List<SubGenre> SubGenres { get; set; } = [];
}

public class SubGenre
{
    public int Id { get; set; }
    public int GenreId { get; set; }
    public Genre Genre { get; set; } = null!;
    public required string Name { get; set; }
}
