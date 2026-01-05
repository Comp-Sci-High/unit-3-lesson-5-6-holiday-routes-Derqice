/**
 * Santa's Flight Game
 * Player controls Santa to avoid falling coal and reach the Grinch
 * Collect reindeer for bonus points!
 */

class SantaGame {
  constructor() {
    // Game state
    this.isPlaying = false;
    this.score = 0;
    this.distance = 0;
    this.reindeersCollected = 0;

    // Santa (player) properties
    this.santa = document.getElementById('santa');
    this.santaX = 50;
    this.santaY = window.innerHeight / 2;
    this.santaSpeed = 5;
    this.santaSize = 50; // approximation

    // Controls
    this.keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowRight: false,
      ArrowLeft: false,
      w: false,
      W: false,
      s: false,
      S: false,
      d: false,
      D: false,
      a: false,
      A: false
    };

    // Game limits
    this.minY = 0;
    this.maxY = window.innerHeight - this.santaSize;
    this.maxX = window.innerWidth - 100;

    // Obstacles (falling coal)
    this.obstacles = [];
    this.obstaclesContainer = document.getElementById('obstacles');

    // Collectibles (reindeer) - use same container as obstacles
    this.reindeer = [];
    this.collectiblesContainer = this.obstaclesContainer;

    // Grinch (goal)
    this.grinch = document.getElementById('grinchGoal');
    this.grinchX = window.innerWidth - 100;
    this.grinchY = window.innerHeight / 2;

    // UI elements
    this.scoreDisplay = document.getElementById('score');
    this.distanceDisplay = document.getElementById('distance');
    this.messageDisplay = document.getElementById('message');
    this.gameOverlay = document.getElementById('gameOverlay');
    this.winScreen = document.getElementById('winScreen');
    this.gameOverScreen = document.getElementById('gameOverScreen');
    this.restartButton = document.getElementById('restartBtn');
    this.retryButton = document.getElementById('retryBtn');

    // Bind methods
    this.update = this.update.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.spawnObstacle = this.spawnObstacle.bind(this);
    this.spawnReindeer = this.spawnReindeer.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.restart = this.restart.bind(this);

    // Initialize
    this.init();
  }

  init() {
    // Set up event listeners
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    this.restartButton.addEventListener('click', this.restart);
    this.retryButton.addEventListener('click', this.restart);

    // Start game loop
    this.start();
  }

  start() {
    this.isPlaying = true;
    if (this.gameOverlay) this.gameOverlay.style.display = 'none';
    if (this.winScreen) this.winScreen.style.display = 'none';
    if (this.gameOverScreen) this.gameOverScreen.style.display = 'none';
    this.update();
  }

  update() {
    if (!this.isPlaying) return;

    // Handle player input
    this.handleInput();

    // Update game objects
    this.updateObstacles();
    this.updateReindeer();
    this.updateGrinchMovement();

    // Check collisions
    this.checkCollisions();

    // Update UI
    this.updateUI();

    // Continue game loop
    requestAnimationFrame(this.update);
  }

  handleInput() {
    // Move Santa based on key presses
    if (this.keys.ArrowUp || this.keys.w || this.keys.W) {
      this.santaY -= this.santaSpeed;
    }
    if (this.keys.ArrowDown || this.keys.s || this.keys.S) {
      this.santaY += this.santaSpeed;
    }
    if (this.keys.ArrowRight || this.keys.d || this.keys.D) {
      this.santaX += this.santaSpeed;
    }
    if (this.keys.ArrowLeft || this.keys.a || this.keys.A) {
      this.santaX -= this.santaSpeed;
    }

    // Keep Santa within bounds
    this.santaY = Math.max(this.minY, Math.min(this.maxY, this.santaY));
    this.santaX = Math.max(0, Math.min(this.maxX, this.santaX));

    // Update Santa position
    this.santa.style.left = this.santaX + 'px';
    this.santa.style.top = this.santaY + 'px';
  }

  updateObstacles() {
    // Move existing obstacles
    this.obstacles.forEach((obstacle, index) => {
      obstacle.y += obstacle.speed;
      obstacle.element.style.top = obstacle.y + 'px';

      // Remove obstacles that have fallen off screen
      if (obstacle.y > window.innerHeight) {
        obstacle.element.remove();
        this.obstacles.splice(index, 1);
      }
    });

    // Spawn new obstacles (only after 1000 points)
    if (this.score >= 1000 && Math.random() < 0.02) { // 2% chance per frame
      this.spawnObstacle();
    }
  }

  spawnObstacle() {
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.textContent = '⚫';

    const x = Math.random() * (window.innerWidth - 50);
    const y = -50;

    obstacle.style.left = x + 'px';
    obstacle.style.top = y + 'px';

    this.obstaclesContainer.appendChild(obstacle);

    this.obstacles.push({
      element: obstacle,
      x: x,
      y: y,
      speed: (3 + Math.random() * 2) * Math.pow(1.05, this.reindeersCollected) // 5% faster per reindeer collected
    });
  }

  updateReindeer() {
    // Move existing reindeer
    this.reindeer.forEach((reindeer, index) => {
      reindeer.y += reindeer.speed;
      reindeer.element.style.top = reindeer.y + 'px';

      // Remove reindeer that have fallen off screen
      if (reindeer.y > window.innerHeight) {
        reindeer.element.remove();
        this.reindeer.splice(index, 1);
      }
    });

    // Spawn new reindeer
    if (Math.random() < 0.015) { // 1.5% chance per frame (increased from 0.5%)
      this.spawnReindeer();
    }
  }

  spawnReindeer() {
    const reindeer = document.createElement('div');
    reindeer.className = 'reindeer';
    reindeer.textContent = '🦌';

    const x = Math.random() * (window.innerWidth - 50);
    const y = -50;

    reindeer.style.left = x + 'px';
    reindeer.style.top = y + 'px';

    this.collectiblesContainer.appendChild(reindeer);

    this.reindeer.push({
      element: reindeer,
      x: x,
      y: y,
      speed: 2 + Math.random() * 2
    });
  }

  updateGrinchMovement() {
    // Grinch chases Santa
    const dx = this.santaX - this.grinchX;
    const dy = this.santaY - this.grinchY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      // Move Grinch towards Santa
      const speed = 1.5; // Grinch moves slower than Santa
      this.grinchX += (dx / distance) * speed;
      this.grinchY += (dy / distance) * speed;

      // Keep Grinch within bounds
      this.grinchX = Math.max(0, Math.min(window.innerWidth - 100, this.grinchX));
      this.grinchY = Math.max(0, Math.min(window.innerHeight - 100, this.grinchY));

      // Update Grinch position
      this.grinch.style.left = this.grinchX + 'px';
      this.grinch.style.top = this.grinchY + 'px';
    }
  }

  checkCollisions() {
    // Check obstacle collisions
    this.obstacles.forEach((obstacle, index) => {
      if (this.isColliding(this.santaX, this.santaY, this.santaSize, this.santaSize,
                          obstacle.x, obstacle.y, 50, 50)) {
        this.gameOver();
      }
    });

    // Check reindeer collection
    this.reindeer.forEach((reindeer, index) => {
      if (this.isColliding(this.santaX, this.santaY, this.santaSize, this.santaSize,
                          reindeer.x, reindeer.y, 50, 50)) {
        // Collect reindeer
        reindeer.element.remove();
        this.reindeer.splice(index, 1);
        this.reindeersCollected++;
        this.score += 100;
      }
    });

    // Check Grinch collision (lose condition - Grinch catches Santa!)
    if (this.isColliding(this.santaX, this.santaY, this.santaSize, this.santaSize,
                        this.grinchX, this.grinchY, 50, 50)) {
      this.gameOverByGrinch(); // Lose
    }
  }

  isColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }

  updateUI() {
    if (this.scoreDisplay) this.scoreDisplay.textContent = this.score;
    if (this.distanceDisplay) this.distanceDisplay.textContent = Math.floor(this.distance);
    if (this.messageDisplay) this.messageDisplay.textContent = `Score: ${this.score} | Distance: ${Math.floor(this.distance)}% | Reindeer: ${this.reindeersCollected}`;
    
    // Only increase distance when Santa is moving
    const isMoving = this.keys.ArrowUp || this.keys.w || this.keys.W ||
                     this.keys.ArrowDown || this.keys.s || this.keys.S ||
                     this.keys.ArrowRight || this.keys.d || this.keys.D ||
                     this.keys.ArrowLeft || this.keys.a || this.keys.A;
    
    if (isMoving) {
      this.distance += 0.1;
    }
  }

  gameOver(didWin = false) {
    this.isPlaying = false;
    if (this.gameOverScreen) {
      const title = this.gameOverScreen.querySelector('#gameOverTitle');
      const score = this.gameOverScreen.querySelector('#gameOverScore');
      if (title) title.textContent = didWin ? '🎉 You Won! 🎉' : '💥 Hit! 💥';
      if (score) score.textContent = `Score: ${this.score} | Distance: ${Math.floor(this.distance)}% | Reindeer: ${this.reindeersCollected}`;
      this.gameOverScreen.style.display = 'flex';
    }
  }

  gameOverByGrinch() {
    this.isPlaying = false;
    if (this.gameOverScreen) {
      const title = this.gameOverScreen.querySelector('#gameOverTitle');
      const score = this.gameOverScreen.querySelector('#gameOverScore');
      if (title) title.textContent = '👹 Grinch Caught You! 👹';
      if (score) score.textContent = `Score: ${this.score} | Distance: ${Math.floor(this.distance)}% | Reindeer: ${this.reindeersCollected}`;
      this.gameOverScreen.style.display = 'flex';
    }
  }

  restart() {
    // Reset game state
    this.score = 0;
    this.distance = 0;
    this.reindeersCollected = 0;
    this.santaX = 50;
    this.santaY = window.innerHeight / 2;

    // Clear obstacles and reindeer
    this.obstacles.forEach(obstacle => obstacle.element.remove());
    this.reindeer.forEach(reindeer => reindeer.element.remove());
    this.obstacles = [];
    this.reindeer = [];

    // Restart game
    this.start();
  }

  handleKeyDown(event) {
    if (this.keys.hasOwnProperty(event.key)) {
      this.keys[event.key] = true;
      event.preventDefault();
    }
  }

  handleKeyUp(event) {
    if (this.keys.hasOwnProperty(event.key)) {
      this.keys[event.key] = false;
      event.preventDefault();
    }
  }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SantaGame();
});
