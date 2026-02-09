using Microsoft.EntityFrameworkCore;
using Users;
using Collections;
using Genres;
using System.Text.Json;

namespace Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    private static readonly JsonSerializerOptions JsonOptions = new() { PropertyNameCaseInsensitive = true };

    public DbSet<User> Users => Set<User>();
    public DbSet<Collection> Collections => Set<Collection>();
    public DbSet<CollectionAlbum> CollectionAlbums => Set<CollectionAlbum>();
    public DbSet<FavouriteSong> FavouriteSongs => Set<FavouriteSong>();
    public DbSet<Genre> Genres => Set<Genre>();
    public DbSet<SubGenre> SubGenres => Set<SubGenre>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasIndex(u => u.Username).IsUnique();

        // Seed genres & subgenres
        var genresJson = File.ReadAllText("src/Genres/genres.json");
        var genreGroups = JsonSerializer.Deserialize<List<GenreSeed>>(genresJson, JsonOptions);

        var genres = new List<Genre>();
        var subGenres = new List<SubGenre>();
        var genreId = 1;
        var subGenreId = 1;

        foreach (var group in genreGroups!)
        {
            var currentGenreId = genreId;
            genres.Add(new Genre { Id = genreId++, Name = group.Name });

            foreach (var sub in group.SubGenres)
            {
                subGenres.Add(new SubGenre { Id = subGenreId++, Name = sub, GenreId = currentGenreId });
            }
        }

        modelBuilder.Entity<Genre>().HasData(genres);
        modelBuilder.Entity<SubGenre>().HasData(subGenres);
    }
}

file class GenreSeed
{
    public required string Name { get; set; }
    public List<string> SubGenres { get; set; } = [];
}
