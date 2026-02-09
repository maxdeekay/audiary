using Microsoft.EntityFrameworkCore;
using Users;
using Collections;
using Albums;

namespace Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Album> Albums => Set<Album>();
    public DbSet<Collection> Collections => Set<Collection>();
    public DbSet<CollectionAlbum> CollectionAlbums => Set<CollectionAlbum>();
    public DbSet<FavouriteSong> FavouriteSongs => Set<FavouriteSong>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasIndex(u => u.Username).IsUnique();
        modelBuilder.Entity<Album>().HasIndex(a => a.MusicBrainzId).IsUnique();
    }
}
