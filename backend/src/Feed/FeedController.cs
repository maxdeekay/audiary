using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Auth;

namespace Feed.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class FeedController(IFeedService feedService) : ControllerBase
{
    [HttpGet]
    public async Task<List<FeedItemResponse>> GetUserFeed()
    {
        var userId = User.GetUserId();
        return await feedService.GetUserFeed(userId);
    }
}
