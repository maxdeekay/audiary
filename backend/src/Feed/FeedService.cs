using Microsoft.EntityFrameworkCore;
using Data;

namespace Feed;

public interface IFeedService
{
    Task<List<FeedItemResponse>> GetUserFeed(int userId);
}

public class FeedService(AppDbContext db) : IFeedService
{
    public async Task<List<FeedItemResponse>> GetUserFeed(int userId)
    {
        return await db.ActivityEvents
            .Where(ae => db.Follows.Any(f =>
                f.FollowerId == userId &&
                f.FollowingId == ae.UserId))
            .OrderByDescending(ae => ae.CreatedAt)
            .Take(30)
            .Select(ae => new FeedItemResponse
            {
                Type = ae.Type,
                CreatedAt = ae.CreatedAt,
                UserId = ae.UserId,
                Username = ae.User.Username,
                CollectionId = ae.CollectionAlbum.CollectionId,
                CollectionName = ae.CollectionAlbum.Collection.Name,
                CollectionAlbumId = ae.CollectionAlbumId,
                AlbumId = ae.CollectionAlbum.AlbumId,
                AlbumTitle = ae.CollectionAlbum.Album.Title,
                AlbumArtist = ae.CollectionAlbum.Album.Artist,
                AlbumCoverUrl = ae.CollectionAlbum.Album.CoverUrl,
                ReleaseYear = ae.CollectionAlbum.Album.ReleaseYear,
                Rating = ae.Rating,
                Comment = ae.Comment
            }).ToListAsync();
    }
}
