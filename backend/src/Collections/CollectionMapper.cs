namespace Collections;

public static class CollectionMapper
{
    public static CollectionDTO ToDTO(Collection collection)
    {
        return new CollectionDTO
        {
            Id = collection.Id,
            Name = collection.Name,
            Description = collection.Description,
            CreatedAt = collection.CreatedAt,
            Albums = [.. collection.Albums.Select(ToDTO)]
        };
    }

    public static CollectionAlbumDTO ToDTO(CollectionAlbum album)
    {
        return new CollectionAlbumDTO
        {
            Id = album.Id,
            Title = album.Title,
            Artist = album.Artist,
            CoverUrl = album.CoverUrl,
            ReleaseYear = album.ReleaseYear,
            Rating = album.Rating,
            Position = album.Position,
            Comment = album.Comment,
            AddedAt = album.AddedAt,
            FavouriteSongs = [.. album.FavouriteSongs.Select(ToDTO)]
        };
    }

    public static FavouriteSongDTO ToDTO(FavouriteSong song)
    {
        return new FavouriteSongDTO
        {
            Id = song.Id,
            Name = song.Name,
            Position = song.Position
        };
    }

    public static Collection ToEntity(CreateCollectionDTO request, int userId)
    {
        return new Collection
        {
            Name = request.Name,
            Description = request.Description,
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            Albums = [.. request.Albums.Select(ToEntity)]
        };
    }

    public static CollectionAlbum ToEntity(CreateCollectionAlbumDTO album)
    {
        return new CollectionAlbum
        {
            Title = album.Title,
            Artist = album.Artist,
            CoverUrl = album.CoverUrl,
            ReleaseYear = album.ReleaseYear,
            Rating = album.Rating,
            Position = album.Position,
            Comment = album.Comment,
            AddedAt = DateTime.UtcNow,
            FavouriteSongs = [.. album.FavouriteSongs.Select(ToEntity)]
        };
    }

    public static FavouriteSong ToEntity(CreateFavouriteSongDTO song)
    {
        return new FavouriteSong
        {
            Name = song.Name,
            Position = song.Position
        };
    }
}
