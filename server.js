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

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 6969; // You can change this port

// Enable CORS for the game server
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Main game endpoint
app.post("/", (req, res) => {
  // Game state from request body
  const { gameState, player, enemy } = req.body;
  console.log(req.body);

  // Log the current game state (optional)
  console.log("Game State:", gameState);
  console.log("Player:", player);
  console.log("Enemy:", enemy);

  // TODO: Add your strategy here!
  // Example: return a random move
  const move = getMove({ gameState, player, enemy });

  // Send your move back to the game
  res.json(move);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Bot server running on port ${PORT}`);
});

const shoot = 3;
const turnLeft = 1;
const turnRight = 2;
const moveForward = 0;

function getDirections({ gameState, player, enemy }) {
  let playerDirection;
  let enemyDirection;
  let x = 0;
  let y = 0;
  for (const token of gameState.split("")) {
    if (enemy.position.x === x && enemy.position.y === y) {
      enemyDirection = token;
    } else if (player.position.x === x && player.position.y === y) {
      playerDirection = token;
    }
    if (token === "\n") {
      y++;
      x = 0;
    } else {
      x++;
    }
  }
  return {
    playerDirection,
    enemyDirection,
  };
}

let lastEnemyPositions = [];
let lastWasStationary = false;

function getMove({ gameState, player, enemy }) {
  const directions = getDirections({ gameState, player, enemy });
  const isRightOf = player.position.x < enemy.position.x;
  const isLeftOf = player.position.x > enemy.position.x;
  const isAbove = player.position.y > enemy.position.y;
  const isBelow = player.position.y < enemy.position.y;

  function logger(value) {
    console.log({
      desiredDirection,
      currentDirection,
      isRightOf,
      isLeftOf,
      isAbove,
      isBelow,
      value,
    });
    return value;
  }
  const yDiff = Math.abs(player.position.y - enemy.position.y);
  const xDiff = Math.abs(player.position.x - enemy.position.x);
  let desiredDirection;
  if (isRightOf) {
    if (yDiff === 0) {
      desiredDirection = "R";
    } else if (yDiff < xDiff) {
      desiredDirection = "R";
    } else if (isAbove) {
      desiredDirection = isAbove ? "U" : "D";
    }
  } else if (isBelow) {
    if (xDiff === 0) {
      desiredDirection = "D";
    } else if (yDiff < xDiff) {
      desiredDirection = "D";
    } else {
      desiredDirection = isLeftOf ? "L" : "R";
    }
  } else if (isLeftOf) {
    if (yDiff === 0) {
      desiredDirection = "L";
    } else if (yDiff < xDiff) {
      desiredDirection = "L";
    } else {
      desiredDirection = isAbove ? "U" : "D";
    }
  } else if (isAbove) {
    if (xDiff === 0) {
      desiredDirection = "U";
    } else if (yDiff < xDiff) {
      desiredDirection = "U";
    } else {
      desiredDirection = isLeftOf ? "L" : "R";
    }
  }
  const isStationary = lastEnemyPositions.every(
    (pos) => pos.x === enemy.position.x && pos.y === enemy.position.y
  );
  lastEnemyPositions.push(enemy.position);
  if (lastEnemyPositions.length > 5) {
    lastEnemyPositions.shift();
  }
  if (isStationary) {
    if (!lastWasStationary) {
      lastWasStationary = !lastWasStationary;
      return moveForward;
    }
  }

  const currentDirection = directions.playerDirection;
  if (desiredDirection === currentDirection) {
    return logger(shoot);
  } else {
    if (desiredDirection === "R") {
      if (currentDirection === "U") {
        return logger(turnRight);
      } else if (currentDirection === "D") {
        return logger(turnLeft);
      } else if (currentDirection === "L") {
        return logger(turnRight);
      }
    } else if (desiredDirection === "D") {
      if (currentDirection === "U") {
        return logger(turnRight);
      } else if (currentDirection === "L") {
        return logger(turnRight);
      } else if (currentDirection === "R") {
        return logger(turnLeft);
      }
    } else if (desiredDirection === "L") {
      if (currentDirection === "U") {
        return logger(turnLeft);
      } else if (currentDirection === "D") {
        return logger(turnRight);
      } else if (currentDirection === "R") {
        return logger(turnRight);
      }
    } else if (desiredDirection === "U") {
      if (currentDirection === "D") {
        return logger(turnRight);
      } else if (currentDirection === "L") {
        return logger(turnRight);
      } else if (currentDirection === "R") {
        return logger(turnLeft);
      }
    }
  }
  console.log("unexpected", {
    desiredDirection,
    currentDirection,
    isRightOf,
    isLeftOf,
    isAbove,
    isBelow,
  });
  return shoot;
}
