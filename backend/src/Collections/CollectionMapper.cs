namespace Collections;

public static class CollectionMapper
{
    public static CollectionSummaryResponse ToSummary(Collection collection)
    {
        return new CollectionSummaryResponse
        {
            Id = collection.Id,
            Name = collection.Name,
            Description = collection.Description,
            AlbumCount = collection.Albums.Count,
            MusicBrainzIds = [.. collection.Albums.Select(a => a.Album.MusicBrainzId)],
            CreatedAt = collection.CreatedAt
        };
    }

    public static CollectionDetailResponse ToDetail(Collection collection)
    {
        return new CollectionDetailResponse
        {
            Id = collection.Id,
            Name = collection.Name,
            Description = collection.Description,
            CreatedAt = collection.CreatedAt,
            Albums = [.. collection.Albums.Select(ToAlbumResponse)]
        };
    }

    public static CollectionAlbumResponse ToAlbumResponse(CollectionAlbum ca)
    {
        return new CollectionAlbumResponse
        {
            Id = ca.Id,
            AlbumId = ca.AlbumId,
            MusicBrainzId = ca.Album.MusicBrainzId,
            Title = ca.Album.Title,
            Artist = ca.Album.Artist,
            CoverUrl = ca.Album.CoverUrl,
            Genre = ca.Album.Genre,
            ReleaseYear = ca.Album.ReleaseYear,
            Rating = ca.Rating,
            Position = ca.Position,
            AddedAt = ca.AddedAt
        };
    }

    public static CollectionAlbumDetailResponse ToAlbumDetail(CollectionAlbum ca)
    {
        return new CollectionAlbumDetailResponse
        {
            Id = ca.Id,
            AlbumId = ca.AlbumId,
            MusicBrainzId = ca.Album.MusicBrainzId,
            Title = ca.Album.Title,
            Artist = ca.Album.Artist,
            CoverUrl = ca.Album.CoverUrl,
            Genre = ca.Album.Genre,
            ReleaseYear = ca.Album.ReleaseYear,
            Rating = ca.Rating,
            Position = ca.Position,
            Comment = ca.Comment,
            AddedAt = ca.AddedAt,
            Tracks = [.. ca.Album.Tracks?.Select(t => new TrackResponse
            {
                Id = t.Id,
                Title = t.Title,
                Position = t.Position ?? 0,
                Length = t.Length,
                IsFavourite = ca.FavouriteTracks.Any(fs => fs.TrackId == t.Id)
            }) ?? []]
        };
    }

    public static Collection ToEntity(CreateCollectionRequest request, int userId)
    {
        return new Collection
        {
            Name = request.Name,
            Description = request.Description,
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
        };
    }
}
