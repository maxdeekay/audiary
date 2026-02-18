using Albums;
using Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Collections.Controllers;

[ApiController]
[Authorize]
[Route("api/collections")]
public class CollectionController(ICollectionService collectionService) : ControllerBase
{
    [HttpPost]
    public async Task<CollectionSummaryResponse> Create(CreateCollectionRequest request)
    {
        var userId = User.GetUserId();
        return await collectionService.Create(request, userId);
    }

    [HttpGet]
    public async Task<List<CollectionSummaryResponse>> GetAll()
    {
        var userId = User.GetUserId();
        return await collectionService.GetAll(userId);
    }

    [HttpGet("{collectionId}")]
    public async Task<CollectionDetailResponse> GetCollection(int collectionId)
    {
        var userId = User.GetUserId();
        return await collectionService.GetCollection(collectionId, userId);
    }

    [HttpGet("{collectionId}/albums/{albumId}")]
    public async Task<CollectionAlbumDetailResponse> GetCollectionAlbum(int collectionId, int albumId)
    {
        var userId = User.GetUserId();
        return await collectionService.GetCollectionAlbum(collectionId, albumId, userId);
    }

    [HttpPatch("{collectionId}/albums/{albumId}")]
    public async Task<IActionResult> UpdateCollectionAlbum(int collectionId, int albumId, [FromBody] UpdateCollectionAlbumRequest request)
    {
        var userId = User.GetUserId();
        await collectionService.UpdateCollectionAlbum(collectionId, albumId, request, userId);
        return NoContent();
    }

    [HttpPost("{collectionId}/albums")]
    public async Task<CollectionDetailResponse> AddAlbum(int collectionId, AddAlbumRequest request)
    {
        var userId = User.GetUserId();
        return await collectionService.AddAlbum(collectionId, request, userId);
    }

    [HttpPost("{collectionAlbumId}/favourites/{trackId}")]
    public async Task<IActionResult> AddFavouriteTrack(int collectionAlbumId, int trackId)
    {
        var userId = User.GetUserId();
        await collectionService.AddFavouriteTrack(collectionAlbumId, trackId, userId);
        return NoContent();
    }

    [HttpDelete("{collectionAlbumId}/favourites/{trackId}")]
    public async Task<IActionResult> DeleteFavouriteTrack(int collectionAlbumId, int trackId)
    {
        var userId = User.GetUserId();
        await collectionService.DeleteFavouriteTrack(collectionAlbumId, trackId, userId);
        return NoContent();
    }
}
