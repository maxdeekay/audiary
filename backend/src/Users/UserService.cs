using Microsoft.EntityFrameworkCore;
using Exceptions;
using Auth;
using Data;

namespace Users;

public interface IUserService
{
    Task<AuthResponse> Create(AuthRequest request);
    Task<AuthResponse> Login(AuthRequest request);
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
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
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
}
