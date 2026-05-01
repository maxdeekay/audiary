using Microsoft.EntityFrameworkCore;
using Exceptions;
using Auth;
using Data;

namespace Users;

public interface IUserService
{
    Task<AuthResponse> Create(AuthRequest request);
    Task<AuthResponse> Login(AuthRequest request);
    Task Follow(int userId, int targetUserId);
    Task UnFollow(int userId, int targetUserId);
    Task<List<UserSummaryResponse>> GetFollowing(int userId);
    Task<List<UserSearchResponse>> Search(int userId, string targetUserId);
}

public class UserService(AppDbContext db, IJwtService jwtService) : IUserService
{
    public async Task<AuthResponse> Create(AuthRequest request)
    {
        var user = await db.Users.AnyAsync(u => u.Username == request.Username);
        if (user)
            throw new ConflictException("A user with this username already exists");

        var newUser = new User
        {
            Username = request.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            CreatedAt = DateTime.UtcNow
        };

        db.Users.Add(newUser);
        await db.SaveChangesAsync();

        var token = jwtService.GenerateToken(newUser);

        return new AuthResponse
        {
            Token = token,
            User = new UserDTO
            {
                Id = newUser.Id,
                Username = newUser.Username
            }
        };
    }

    public async Task<AuthResponse> Login(AuthRequest request)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Username == request.Username)
            ?? throw new UnauthorizedException("Invalid username or password");

        var match = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
        if (!match)
            throw new UnauthorizedException("Invalid username or password");

        var token = jwtService.GenerateToken(user);

        return new AuthResponse
        {
            Token = token,
            User = new UserDTO
            {
                Id = user.Id,
                Username = user.Username
            }
        };
    }

    public async Task Follow(int userId, int targetUserId)
    {
        if (userId == targetUserId)
            throw new BadRequestException("You cannot follow yourself");

        var targetExists = await db.Users.AnyAsync(u => u.Id == targetUserId);
        if (!targetExists)
            throw new NotFoundException("User not found");

        var alreadyFollowing = await db.Follows.AnyAsync(f => f.FollowerId == userId && f.FollowingId == targetUserId);
        if (alreadyFollowing)
            return;

        var follow = new Follow
        {
            FollowerId = userId,
            FollowingId = targetUserId,
            CreatedAt = DateTime.UtcNow
        };

        db.Follows.Add(follow);
        await db.SaveChangesAsync();
    }

    public async Task UnFollow(int userId, int targetUserId)
    {
        // TODO
    }

    public async Task<List<UserSummaryResponse>> GetFollowing(int userId)
    {
        var follows = await db.Follows
            .Where(f => f.FollowerId == userId)
            .Include(f => f.Following)
            .OrderBy(f => f.Following.Username)
            .ToListAsync();

        return [.. follows.Select(f => new UserSummaryResponse
        {
            Id = f.Following.Id,
            Username = f.Following.Username,
            FollowedAt = f.CreatedAt
        })];
    }

    public async Task<List<UserSearchResponse>> Search(int userId, string query)
    {
        var normalizedQuery = query.Trim();

        if (normalizedQuery.Length == 0)
            return [];

        return await db.Users
            .Where(u =>
                u.Id != userId &&
                EF.Functions.ILike(u.Username, $"%{normalizedQuery}%"))
            .OrderBy(u => u.Username)
            .Take(20)
            .Select(u => new UserSearchResponse
            {
                Id = u.Id,
                Username = u.Username,
                IsFollowing = db.Follows.Any(f => f.FollowerId == userId && f.FollowingId == u.Id)
            })
            .ToListAsync();
    }
}
