using Users;

namespace Collections;

public class CreateCollectionDTO
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public List<CreateCollectionAlbumDTO> Albums { get; set; } = [];
}

public class CreateCollectionAlbumDTO
{
    public required string Title { get; set; }
    public required string Artist { get; set; }
    public int? GenreId { get; set; }
    public int? SubGenreId { get; set; }
    public string? CoverUrl { get; set; }
    public int ReleaseYear { get; set; }
    public decimal? Rating { get; set; }
    public int Position { get; set; }
    public required string Comment { get; set; }
    public List<CreateFavouriteSongDTO> FavouriteSongs { get; set; } = [];
}

public class CreateFavouriteSongDTO
{
    public required string Name { get; set; }
    public int Position { get; set; }
}
