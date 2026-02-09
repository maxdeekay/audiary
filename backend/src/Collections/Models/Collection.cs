using Users;
using Albums;

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
    public int AlbumId { get; set; }
    public Album Album { get; set; } = null!;
    public decimal? Rating { get; set; }
    public int Position { get; set; }
    public string? Comment { get; set; }
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
