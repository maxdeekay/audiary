using Microsoft.EntityFrameworkCore;
using Exceptions;
using Users;
using Data;

namespace Collections;

public interface ICollectionService
{
    Task<CollectionDTO> Create(CreateCollectionDTO request, int userId);
    Task<List<CollectionDTO>> GetAll(int userId);
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
            .ToListAsync();

        return [.. collections.Select(CollectionMapper.ToDTO)];
    }
}
