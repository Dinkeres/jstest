// Create the HTML canvas element
const html = `
  <canvas id="canvas" width="400" height="400" style="border: 1px solid black;"></canvas>
  <p id="score">Score: 0</p>
`;

// Create the game container element
const container = document.createElement('div');
container.innerHTML = html;
document.body.appendChild(container);

// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Define the snake and food objects
let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 }
];

let food = {
  x: Math.floor(Math.random() * 40) * 10,
  y: Math.floor(Math.random() * 40) * 10
};

// Define the game variables
let score = 0;
let direction = 'right';
let speed = 10;

// Main game loop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = 'green';
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }

  // Draw the food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, 10, 10);

  // Update the snake position
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }

  // Update the snake head position based on the direction
  if (direction === 'right') {
    snake[0].x += 10;
  } else if (direction === 'left') {
    snake[0].x -= 10;
  } else if (direction === 'up') {
    snake[0].y -= 10;
  } else if (direction === 'down') {
    snake[0].y += 10;
  }

  // Check for collision with the wall or itself
  if (snake[0].x < 0 || snake[0].x > canvas.width - 10 || snake[0].y < 0 || snake[0].y > canvas.height - 10) {
    alert('Game Over!');
    return;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      alert('Game Over!');
      return;
    }
  }

  // Check if the snake eats the food
  if (snake[0].x === food.x && snake[0].y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 40) * 10,
      y: Math.floor(Math.random() * 40) * 10
    };
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
  }

  // Update the score
  document.getElementById('score').innerHTML = 'Score: ' + score;

  // Call the draw function again after a short delay
  setTimeout(draw, 1000 / speed);
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && direction !== 'left') {
    direction = 'right';
  } else if (e.key === 'ArrowLeft' && direction !== 'right') {
    direction = 'left';
  } else if (e.key === 'ArrowUp' && direction !== 'down') {
    direction = 'up';
  } else if (e.key === 'ArrowDown' && direction !== 'up') {
    direction = 'down';
  }
});

// Start the game
draw();
