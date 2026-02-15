namespace Music;

public class ThrottlingHandler : DelegatingHandler
{
    private static readonly SemaphoreSlim Throttle = new(1, 1);

    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken
    )
    {
        await Throttle.WaitAsync(cancellationToken);
        try
        {
            return await base.SendAsync(request, cancellationToken);
        }
        finally
        {
            await Task.Delay(1000, cancellationToken);
            Throttle.Release();
        }
    }
}