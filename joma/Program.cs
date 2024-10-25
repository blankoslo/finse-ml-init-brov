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

app.MapPost("/", (Payload payload, CancellationToken token) =>
{    
    Console.WriteLine($"\nGameState:\n{payload.GameState}\n");
    ConsoleKeyInfo input = Console.ReadKey();
    
    var mov = input.KeyChar switch {
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
