var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(c => 
{
    c.AllowAnyHeader();
    c.AllowAnyMethod();
    c.AllowAnyOrigin();
});

app.MapGet("/", () => "Hello World!");

app.MapPost("/", async (Payload payload, CancellationToken token) =>
{    
    Console.WriteLine($"\nGameState:\n{payload.GameState}\n");
    char input = await WaitForKey(1000, token);
    
    var mov = input switch {
        'w' => 0,
        'a' => 1,
        's' => 3,
        'd' => 2,
        _ => 3
    };     
    Console.WriteLine($"Doing {mov}");  
    return mov;
});

await app.RunAsync();

static async Task<char> WaitForKey(int ms, CancellationToken token)
{
    int delay = 0;
    while (delay < ms) {
        if (Console.KeyAvailable) {
            return Console.ReadKey().KeyChar;
        }

        await Task.Delay(50, token);
        delay += 50;
    }
    return 's';
}

public class Payload
{
    public string GameState {get;set;}
    public Player Player {get;set;}
    
    public Player Enemy {get;set;}
}

public class Player
{
    public int Health {get;set;}
    public Position Position {get;set;}
}

public class Position
{
    public int X {get;set;}
    public int Y {get;set;}
}