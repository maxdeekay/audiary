using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
}
