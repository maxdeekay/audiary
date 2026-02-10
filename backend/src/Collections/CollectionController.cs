using Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Collections.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]s")]
public class CollectionController(ICollectionService collectionService) : ControllerBase
{

    [HttpPost]
    [Authorize]
    public async Task<CollectionDTO> Create(CreateCollectionDTO request)
    {
        var userId = User.GetUserId();
        return await collectionService.Create(request, userId);
    }

    [HttpGet]
    [Authorize]
    public async Task<List<CollectionDTO>> GetAll()
    {
        var userId = User.GetUserId();
        return await collectionService.GetAll(userId);
    }

    [HttpPost("{collectionId}/albums")]
    public async Task<CollectionDTO> AddAlbum(int collectionId, AddAlbumDTO request)
    {
        var userId = User.GetUserId();
        return await collectionService.AddAlbum(collectionId, request, userId);
    }
}
