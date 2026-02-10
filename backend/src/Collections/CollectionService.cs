using Microsoft.EntityFrameworkCore;
using Exceptions;
using Data;
using Albums;

namespace Collections;

public interface ICollectionService
{
    Task<CollectionDTO> Create(CreateCollectionDTO request, int userId);
    Task<List<CollectionDTO>> GetAll(int userId);
    Task<CollectionDTO> AddAlbum(int collectionId, AddAlbumDTO request, int userId);
}

public class CollectionService(AppDbContext db) : ICollectionService
{
    public async Task<CollectionDTO> Create(CreateCollectionDTO request, int userId)
    {
        var collection = CollectionMapper.ToEntity(request, userId);
        db.Collections.Add(collection);
        await db.SaveChangesAsync();
        return CollectionMapper.ToDTO(collection);
    }

    public async Task<List<CollectionDTO>> GetAll(int userId)
    {
        var collections = await db.Collections
            .Where(c => c.UserId == userId)
            .Include(c => c.Albums)
                .ThenInclude(ca => ca.Album)
            .Include(c => c.Albums)
                .ThenInclude(ca => ca.FavouriteSongs)
            .AsSplitQuery()
            .ToListAsync();

        return [.. collections.Select(CollectionMapper.ToDTO)];
    }

    public async Task<CollectionDTO> AddAlbum(int collectionId, AddAlbumDTO request, int userId)
    {
        var collection = await db.Collections
            .Include(c => c.Albums)
                .ThenInclude(ca => ca.Album)
            .Include(c => c.Albums)
                .ThenInclude(ca => ca.FavouriteSongs)
            .FirstOrDefaultAsync(c => c.Id == collectionId && c.UserId == userId)
            ?? throw new NotFoundException("Collection not found");

        var album = await db.Albums.FirstOrDefaultAsync(a => a.MusicBrainzId == request.MusicBrainzId);

        album ??= new Album
        {
            MusicBrainzId = request.MusicBrainzId,
            Title = request.Title,
            Artist = request.Artist,
            CoverUrl = request.CoverUrl,
            Genre = request.Genre,
            ReleaseYear = request.ReleaseYear
        };

        var collectionAlbum = new CollectionAlbum
        {
            Album = album,
            Position = collection.Albums.Count,
            AddedAt = DateTime.UtcNow
        };

        collection.Albums.Add(collectionAlbum);
        await db.SaveChangesAsync();

        return CollectionMapper.ToDTO(collection);
    }
}
