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
            .Where(ae =>
                (ae.Type == ActivityEventType.StartedFollowing
                    && ae.TargetUserId == userId
                    && db.Follows.Any(f => f.FollowerId == ae.UserId && f.FollowingId == userId))
                || (ae.Type != ActivityEventType.StartedFollowing
                    && db.Follows.Any(f => f.FollowerId == userId && f.FollowingId == ae.UserId)
                    && !(ae.Type == ActivityEventType.CommentChanged
                        && (ae.Comment == null || ae.Comment == ""))))
            .OrderByDescending(ae => ae.CreatedAt)
            .Take(30)
            .Select(ae => new FeedItemResponse
            {
                Id = ae.Id,
                Type = ae.Type,
                CreatedAt = ae.CreatedAt,
                UserId = ae.UserId,
                Username = ae.User.Username,
                CollectionId = ae.CollectionAlbum != null ? ae.CollectionAlbum.CollectionId : null,
                CollectionName = ae.CollectionAlbum != null ? ae.CollectionAlbum.Collection.Name : null,
                CollectionAlbumId = ae.CollectionAlbumId,
                AlbumId = ae.CollectionAlbum != null ? ae.CollectionAlbum.AlbumId : null,
                AlbumTitle = ae.CollectionAlbum != null ? ae.CollectionAlbum.Album.Title : null,
                AlbumArtist = ae.CollectionAlbum != null ? ae.CollectionAlbum.Album.Artist : null,
                AlbumCoverUrl = ae.CollectionAlbum != null ? ae.CollectionAlbum.Album.CoverUrl : null,
                ReleaseYear = ae.CollectionAlbum != null ? ae.CollectionAlbum.Album.ReleaseYear : null,
                Rating = ae.Rating,
                Comment = ae.Comment,
                TargetUserId = ae.TargetUserId,
                TargetUsername = ae.TargetUser != null ? ae.TargetUser.Username : null,
            }).ToListAsync();
    }
}
