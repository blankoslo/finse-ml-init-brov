/**
 * Tank Game Bot - Express Server Template
 * 
 * What you will receive in req.body:
 * {
 *   gameState: string,     // The game board as a string with '\n' line breaks
 *   player: {              // Your player information
 *     health: number,      // Your current health
 *     position: {
 *       x: number,        // Your X position (0-7)
 *       y: number         // Your Y position (0-7)
 *     }
 *   },
 *   enemy: {               // Enemy information
 *     health: number,      // Enemy current health
 *     position: {
 *       x: number,        // Enemy X position (0-7)
 *       y: number         // Enemy Y position (0-7)
 *     }
 *   }
 * }
 * 
 * Moves you can return:
 * 0 = Shoot
 * 1 = Turn Left
 * 2 = Turn Right
 * 3 = Move Forward
 * 
 * Game board symbols:
 * U = Facing Up
 * D = Facing Down
 * L = Facing Left
 * R = Facing Right
 * . = Empty space
 * # = Wall
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 6969; // You can change this port

// Enable CORS for the game server
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Main game endpoint
app.post('/', (req, res) => {
    // Game state from request body
    const { gameState, player, enemy } = req.body;

    // Log the current game state (optional)
    console.log('Game State:', gameState);
    console.log('Player:', player);
    console.log('Enemy:', enemy);

    // TODO: Add your strategy here!
    // Example: return a random move
    const move = Math.floor(Math.random() * 4);

    // Send your move back to the game
    res.json(move);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Bot server running on port ${PORT}`);
});