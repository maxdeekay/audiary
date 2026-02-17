using Microsoft.EntityFrameworkCore;
using Exceptions;
using Data;
using Albums;
using Music;
using Users;

namespace Collections;

public interface ICollectionService
{
    Task<CollectionSummaryResponse> Create(CreateCollectionRequest request, int userId);
    Task<List<CollectionSummaryResponse>> GetAll(int userId);
    Task<CollectionDetailResponse> GetCollection(int collectionId, int userId);
    Task<CollectionAlbumDetailResponse> GetCollectionAlbum(int collectionId, int albumId, int userId);
    Task<CollectionDetailResponse> AddAlbum(int collectionId, AddAlbumRequest request, int userId);
    Task UpdateCollectionAlbum(int collectionId, int albumId, UpdateCollectionAlbumRequest request, int userId);
}

public class CollectionService(AppDbContext db, IMusicService musicService) : ICollectionService
{
    public async Task<CollectionSummaryResponse> Create(CreateCollectionRequest request, int userId)
    {
        var collection = CollectionMapper.ToEntity(request, userId);
        db.Collections.Add(collection);
        await db.SaveChangesAsync();
        return CollectionMapper.ToSummary(collection);
    }

    public async Task<List<CollectionSummaryResponse>> GetAll(int userId)
    {
        var collections = await db.Collections
            .Where(c => c.UserId == userId)
            .Include(c => c.Albums)
                .ThenInclude(ca => ca.Album)
            .ToListAsync();

        return [.. collections.Select(CollectionMapper.ToSummary)];
    }

    public async Task<CollectionDetailResponse> GetCollection(int collectionId, int userId)
    {
        var collection = await db.Collections
            .Where(c => c.Id == collectionId && c.UserId == userId)
            .Include(c => c.Albums.OrderByDescending(ca => ca.AddedAt))
                .ThenInclude(ca => ca.Album)
            .FirstOrDefaultAsync()
                ?? throw new NotFoundException("Collection not found");

        return CollectionMapper.ToDetail(collection);
    }

    public async Task<CollectionAlbumDetailResponse> GetCollectionAlbum(int collectionId, int albumId, int userId)
    {
        var collectionAlbum = await db.CollectionAlbums
            .Where(ca => ca.CollectionId == collectionId && ca.AlbumId == albumId && ca.Collection.UserId == userId)
            .Include(ca => ca.Album)
                .ThenInclude(a => a.Tracks)
            .Include(ca => ca.FavouriteSongs)
            .FirstOrDefaultAsync()
                ?? throw new NotFoundException("Album not found in collection");

        if (collectionAlbum.Album.Tracks is null || collectionAlbum.Album.Tracks.Count == 0)
        {
            if (collectionAlbum.Album.MusicBrainzReleaseId is not null)
            {
                var trackData = await musicService.FetchTracks(collectionAlbum.Album.MusicBrainzReleaseId);

                collectionAlbum.Album.Tracks = trackData.Select(t => new Track
                {
                    Title = t.Title,
                    Position = t.Position,
                    Length = t.Length,
                    AlbumId = collectionAlbum.AlbumId,
                    Album = collectionAlbum.Album
                }).ToList();

                await db.SaveChangesAsync();
            }
        }

        return CollectionMapper.ToAlbumDetail(collectionAlbum);
    }

    public async Task<CollectionDetailResponse> AddAlbum(int collectionId, AddAlbumRequest request, int userId)
    {
        var collection = await db.Collections
            .Where(c => c.Id == collectionId && c.UserId == userId)
            .Include(c => c.Albums)
                .ThenInclude(ca => ca.Album)
            .FirstOrDefaultAsync()
                ?? throw new NotFoundException("Collection not found");

        var album = await db.Albums.FirstOrDefaultAsync(a => a.MusicBrainzId == request.MusicBrainzId);

        album ??= new Album
        {
            MusicBrainzId = request.MusicBrainzId,
            Title = request.Title,
            Artist = request.Artist,
            CoverUrl = request.CoverUrl,
            Genre = request.Genre,
            ReleaseYear = request.ReleaseYear,
            MusicBrainzReleaseId = request.MusicBrainzReleaseId
        };

        var collectionAlbum = new CollectionAlbum
        {
            Album = album,
            Position = collection.Albums.Count,
            AddedAt = DateTime.UtcNow
        };

        collection.Albums.Add(collectionAlbum);
        await db.SaveChangesAsync();

        return CollectionMapper.ToDetail(collection);
    }

    public async Task UpdateCollectionAlbum(int collectionId, int albumId, UpdateCollectionAlbumRequest request, int userId)
    {
        var collectionAlbum = await db.CollectionAlbums
            .FirstOrDefaultAsync(ca => ca.CollectionId == collectionId && ca.AlbumId == albumId && ca.Collection.UserId == userId)
                ?? throw new NotFoundException("Album not found in collection");

        if (request.Rating is not null)
            collectionAlbum.Rating = request.Rating;

        if (request.Comment is not null)
            collectionAlbum.Comment = request.Comment;

        await db.SaveChangesAsync();
    }
}
