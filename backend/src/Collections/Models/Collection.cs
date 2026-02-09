using Users;
using Genres;

namespace Collections;

public class Collection
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public required string Name { get; set; }
    public string? Description { get; set; }
    public List<CollectionAlbum> Albums { get; set; } = [];
    public required DateTime CreatedAt { get; set; }
}

public class CollectionAlbum
{
    public int Id { get; set; }
    public int CollectionId { get; set; }
    public Collection Collection { get; set; } = null!;
    public required string Title { get; set; }
    public required string Artist { get; set; }
    public int? GenreId { get; set; }
    public Genre? Genre { get; set; }
    public int? SubGenreId { get; set; }
    public SubGenre? SubGenre { get; set; }
    public string? CoverUrl { get; set; }
    public int ReleaseYear { get; set; }
    public decimal? Rating { get; set; }
    public int Position { get; set; }
    public required string Comment { get; set; }
    public List<FavouriteSong> FavouriteSongs { get; set; } = [];
    public required DateTime AddedAt { get; set; }
}

public class FavouriteSong
{
    public int Id { get; set; }
    public int CollectionAlbumId { get; set; }
    public CollectionAlbum CollectionAlbum { get; set; } = null!;
    public required string Name { get; set; }
    public int Position { get; set; }
}
