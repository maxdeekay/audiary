using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Music.Controllers;

[ApiController]
[Authorize]
[Route("api/music")]
public class MusicController(IMusicService musicService) : ControllerBase
{

    [HttpGet("search")]
    public async Task<List<MusicSearchResultDTO>> Search([FromQuery] string q)
    {
        return await musicService.Search(q);
    }
}
