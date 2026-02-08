namespace Exceptions;

public abstract class ApiException(string message) : Exception(message)
{
    public abstract int StatusCode { get; }
}

public class ConflictException(string message) : ApiException(message)
{
    public override int StatusCode => 409;
}

public class UnauthorizedException(string message) : ApiException(message)
{
    public override int StatusCode => 401;
}

public class NotFoundException(string message) : ApiException(message)
{
    public override int StatusCode => 404;
}
