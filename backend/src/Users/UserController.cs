using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Auth;

namespace Users.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]s")]
public class UserController(IUserService userService) : ControllerBase
{

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<AuthResponse> Create(AuthRequest request)
    {
        return await userService.Create(request);
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<AuthResponse> Login(AuthRequest request)
    {
        return await userService.Login(request);
    }

    [HttpPost("{targetUserId}/follow")]
    public async Task<IActionResult> Follow(int targetUserId)
    {
        var userId = User.GetUserId();
        await userService.Follow(userId, targetUserId);
        return NoContent();
    }

    [HttpDelete("{targetUserId}/follow")]
    public async Task<IActionResult> UnFollow(int targetUserId)
    {
        var userId = User.GetUserId();
        await userService.UnFollow(userId, targetUserId);
        return NoContent();
    }

    [HttpGet("following")]
    public async Task<List<UserSummaryResponse>> GetFollowing()
    {
        var userId = User.GetUserId();
        return await userService.GetFollowing(userId);
    }

    [HttpGet("search")]
    public async Task<List<UserSearchResponse>> Search([FromQuery] string query)
    {
        var userId = User.GetUserId();
        return await userService.Search(userId, query);
    }
}
