using System.Text.Json.Serialization;

namespace Music;

public record MusicBrainzTrackResult(string Title, int? Position, int? Length);

public interface IMusicService
{
    Task<List<MusicSearchResultDTO>> Search(string query);
    Task<List<MusicBrainzTrackResult>> FetchTracks(string releaseId);
}

public class MusicService(HttpClient http) : IMusicService
{
    public async Task<List<MusicSearchResultDTO>> Search(string query)
    {
        var fullQuery = Uri.EscapeDataString($"{query} AND primarytype:album");
        var response = await http.GetFromJsonAsync<MusicBrainzResponse>(
            $"https://musicbrainz.org/ws/2/release-group/?query={fullQuery}&fmt=json&limit=15"
        );

        if (response?.ReleaseGroups is null)
            return [];

        return response.ReleaseGroups
            .Select(rg => new MusicSearchResultDTO
            {
                MusicBrainzId = rg.Id,
                MusicBrainzReleaseId = rg.Releases?.FirstOrDefault()?.Id,
                Title = rg.Title,
                Artist = rg.ArtistCredit?.FirstOrDefault()?.Name ?? "Unknown",
                CoverUrl = $"https://coverartarchive.org/release-group/{rg.Id}/front-250",
                Genre = rg.Tags?.MaxBy(t => t.Count)?.Name,
                ReleaseYear = ParseYear(rg.FirstReleaseDate)
            }).ToList();
    }

    public async Task<List<MusicBrainzTrackResult>> FetchTracks(string releaseId)
    {
        var response = await http.GetFromJsonAsync<MusicBrainzReleaseResponse>(
            $"https://musicbrainz.org/ws/2/release/{releaseId}?inc=recordings&fmt=json"
        );

        return response?.Media?
            .SelectMany(m => m.Tracks ?? [])
            .Select(t => new MusicBrainzTrackResult(t.Title, t.Position, t.Length))
            .ToList() ?? [];
    }

    private static int? ParseYear(string? date)
    {
        if (string.IsNullOrEmpty(date)) return null;
        if (date.Length >= 4 && int.TryParse(date[..4], out var year)) return year;
        return null;
    }
}

file class MusicBrainzReleaseResponse
{
    [JsonPropertyName("media")]
    public List<MusicBrainzMedia>? Media { get; set; }
}

file class MusicBrainzMedia
{
    [JsonPropertyName("tracks")]
    public List<MusicBrainzTrack>? Tracks { get; set; }
}

file class MusicBrainzTrack
{
    [JsonPropertyName("position")]
    public int Position { get; set; }

    [JsonPropertyName("title")]
    public required string Title { get; set; }

    [JsonPropertyName("length")]
    public int? Length { get; set; }
}

file class MusicBrainzResponse
{
    [JsonPropertyName("release-groups")]
    public List<ReleaseGroup>? ReleaseGroups { get; set; }
}

file class ReleaseGroup
{
    [JsonPropertyName("id")]
    public required string Id { get; set; }

    [JsonPropertyName("title")]
    public required string Title { get; set; }

    [JsonPropertyName("primary-type")]
    public string? PrimaryType { get; set; }

    [JsonPropertyName("first-release-date")]
    public string? FirstReleaseDate { get; set; }

    [JsonPropertyName("artist-credit")]
    public List<ArtistCredit>? ArtistCredit { get; set; }

    [JsonPropertyName("tags")]
    public List<Tag>? Tags { get; set; }

    [JsonPropertyName("releases")]
    public List<Release>? Releases { get; set; }
}

file class ArtistCredit
{
    [JsonPropertyName("name")]
    public required string Name { get; set; }
}

file class Tag
{
    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("count")]
    public int Count { get; set; }
}

file class Release
{
    [JsonPropertyName("id")]
    public required string Id { get; set; }
}