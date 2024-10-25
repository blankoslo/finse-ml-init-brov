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
    Console.WriteLine("YOUR TURN!!!!!!!!!");
    char input = await WaitForKey(3000, token);
    
    var mov = input switch {
        'w' => 0,
        'a' => 1,
        's' => 3,
        'd' => 2,
        _ => 3
    };
    
    var act = input switch {
        'w' => "Fram",
        'd' => "Snu høyre",
        'a' => "Snu venstre",
        's' => "SKYTER!!!",
        _ => "N/A"
    };
    
    Console.WriteLine($"\n ** {act} **");  
    return mov;
});

await app.RunAsync();

static async Task<char> WaitForKey(int ms, CancellationToken token)
{
    Console.WriteLine($"3s");
    int delay = 0;
    while (delay < ms) {
        if (Console.KeyAvailable) {
            return Console.ReadKey().KeyChar;
        }

        await Task.Delay(50, token);
        delay += 50;
        if(delay % 1000 == 0 && (ms - delay) != 0)
            Console.WriteLine($"{(ms - delay)/1000}s");
    }
    Console.WriteLine($"0s!\nAUTO-FIRE ENGAGED!!");
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
