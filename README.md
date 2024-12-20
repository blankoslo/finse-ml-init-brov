# Trash Panda Bot - Official Template

This is the official template for creating bots for Trash Panda Royal game. Use this template to start building your own bot!

## What Your Bot Will Receive

For each turn, your bot will receive this data structure in `req.body`:
```javascript
{
  gameState: string,     // The game board as a string with '\n' line breaks
  player: {              // Your player information
    health: number,      // Your current health
    position: {
      x: number,        // Your X position (0-7)
      y: number         // Your Y position (0-7)
    }
  },
  enemy: {               // Enemy information
    health: number,      // Enemy current health
    position: {
      x: number,        // Enemy X position (0-7)
      y: number         // Enemy Y position (0-7)
    }
  }
}
```

## Game Board Symbols
```
U = Facing Up
D = Facing Down
L = Facing Left
R = Facing Right
. = Empty space
# = Wall
```

## Board Representation

The `gameState` string represents an 8x8 game board with each row separated by newline characters (`\n`).

The string structure:
- Contains 8 rows of 8 characters each 
- Each row is separated by `\n`
- Total length: 71 characters (63 for the board + 7 newlines)
- Access a position: `gameState.split('\n')[y][x]`
- Total board size: 8x8 tiles
- Middle of the board (rows 3 and 4) contain walls

Example board:
```
.......D
........
........
########    // Middle walls are always here
########    // Middle walls are always here
........
........
D.......
```

## Bot Response Moves
Your bot should return one of these numbers:
```
0 = Move Forward
1 = Turn Right
2 = Turn Left
3 = Shoot
```

## Quick Start
1. Install dependencies:
```bash
npm install express cors body-parser
```

2. Run your server:
```bash
node server.js
```

3. Create a tunnel (choose one):
```bash
# Cloudflare
npm install -g cloudflared
cloudflared tunnel --url http://localhost:6969

# OR Localtunnel
npm install -g localtunnel
lt --port 6969

# OR Ngrok
ngrok http 6969
```

PS: localhost need you to verify the tunnel. GO to the link you made and follow the instructions 

4. Add your tunnel URL to [Trash Panda Royal](https://trash-panda-royal.vercel.app/join) to start playing!

## Template Usage
The template includes:
- Basic Express server setup
- CORS enabled
- JSON body parsing
- Request/Response structure
- Example random move generation

Just modify the `move` logic in the POST route to implement your strategy!
