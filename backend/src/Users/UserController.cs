using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Users.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]s")]
public class UserController : ControllerBase
{
    // public readonly string _jwtSecret;

    public UserController()
    {

    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<ActionResult> CreateUser()
    {
        return Ok();
    }

    [HttpPost("/api/login")]
    [AllowAnonymous]
    public async Task<ActionResult> Login()
    {
        return Ok();
    }
}
