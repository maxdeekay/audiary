using Microsoft.EntityFrameworkCore;
using Users;
using Collections;
using Albums;
using Feed;

namespace Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Album> Albums => Set<Album>();
    public DbSet<Track> Tracks => Set<Track>();
    public DbSet<Collection> Collections => Set<Collection>();
    public DbSet<CollectionAlbum> CollectionAlbums => Set<CollectionAlbum>();
    public DbSet<FavouriteTrack> FavouriteTracks => Set<FavouriteTrack>();
    public DbSet<Follow> Follows => Set<Follow>();
    public DbSet<ActivityEvent> ActivityEvents => Set<ActivityEvent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasIndex(u => u.Username).IsUnique();
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        modelBuilder.Entity<Album>().HasIndex(a => a.MusicBrainzId).IsUnique();
        modelBuilder.Entity<Follow>().HasKey(f => new { f.FollowerId, f.FollowingId });

        modelBuilder.Entity<Follow>()
            .HasOne(f => f.Follower)
            .WithMany()
            .HasForeignKey(f => f.FollowerId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Follow>()
            .HasOne(f => f.Following)
            .WithMany()
            .HasForeignKey(f => f.FollowingId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<ActivityEvent>()
            .HasOne(ae => ae.CollectionAlbum)
            .WithMany()
            .HasForeignKey(ae => ae.CollectionAlbumId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ActivityEvent>()
            .HasOne(ae => ae.TargetUser)
            .WithMany()
            .HasForeignKey(ae => ae.TargetUserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ActivityEvent>()
            .HasIndex(ae => new { ae.CollectionAlbumId, ae.Type })
            .IsUnique()
            .HasFilter("\"CollectionAlbumId\" IS NOT NULL");

        modelBuilder.Entity<ActivityEvent>()
            .HasIndex(ae => new { ae.UserId, ae.TargetUserId, ae.Type })
            .IsUnique()
            .HasFilter("\"TargetUserId\" IS NOT NULL");
    }
}
