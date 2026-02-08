namespace Users;

public class AuthResponse
{
    public required string Token { get; set; }
    public required UserDTO User { get; set; }
}

public class UserDTO
{
    public required int Id { get; set; }
    public required string Username { get; set; }
}
