using Users;
using Genres;

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
    public required string Title { get; set; }
    public required string Artist { get; set; }
    public GenreDTO? Genre { get; set; }
    public SubGenreDTO? SubGenre { get; set; }
    public string? CoverUrl { get; set; }
    public int ReleaseYear { get; set; }
    public decimal? Rating { get; set; }
    public int Position { get; set; }
    public required string Comment { get; set; }
    public List<FavouriteSongDTO> FavouriteSongs { get; set; } = [];
    public required DateTime AddedAt { get; set; }
}

public class FavouriteSongDTO
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int Position { get; set; }
}
