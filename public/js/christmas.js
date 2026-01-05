/**
 * Snowflakes Animation System
 * Creates realistic falling snowflakes with different speeds, sizes, and opacity
 */

const snowflakeTypes = ['❄', '❅', '❆', '✦', '✧', '⋆', '✦', '❉'];

function createSnowflake() {
  const container = document.getElementById('snowflakesContainer');
  
  if (!container) return;
  
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  
  // Random snowflake type with more variety
  const snowflakeChar = snowflakeTypes[Math.floor(Math.random() * snowflakeTypes.length)];
  snowflake.textContent = snowflakeChar;
  
  // Random size (0.5em to 2.5em) - more variety
  const size = Math.random() * 2 + 0.5;
  snowflake.style.fontSize = size + 'em';
  
  // Random horizontal position
  const startX = Math.random() * 100;
  snowflake.style.left = startX + '%';
  
  // Random fall duration (4-12 seconds) - slower for realism
  const duration = Math.random() * 8 + 4;
  snowflake.style.animationDuration = duration + 's';
  
  // Random horizontal drift (more realistic wind effect)
  const drift = (Math.random() - 0.5) * 200;
  snowflake.style.setProperty('--drift', drift + 'px');
  
  // Random opacity (more transparent for depth)
  const opacity = Math.random() * 0.6 + 0.3;
  snowflake.style.opacity = opacity;
  
  // Random rotation for more natural look
  const rotation = Math.random() * 360;
  snowflake.style.transform = `rotate(${rotation}deg)`;
  
  // Add subtle blur for depth
  const blur = Math.random() * 0.5;
  snowflake.style.filter = `blur(${blur}px)`;
  
  container.appendChild(snowflake);
  
  // Remove snowflake after animation completes
  setTimeout(() => {
    snowflake.remove();
  }, duration * 1000);
}

// Create snowflakes at intervals
function initSnowflakes() {
  // Create initial snowflakes
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      createSnowflake();
    }, i * 50);
  }
  
  // Continuously create new snowflakes (more frequent)
  setInterval(createSnowflake, 150);
}

/**
 * Christmas Scene - Falling Presents
 */
const fallingPresentsContainer = document.getElementById('fallingPresents');

function createFallingPresent() {
  const present = document.createElement('div');
  present.classList.add('falling-present');
  present.textContent = '🎁';
  
  const randomX = Math.random() * window.innerWidth;
  present.style.left = randomX + 'px';
  present.style.top = '-50px';
  
  const duration = Math.random() * 3 + 5;
  
  fallingPresentsContainer.appendChild(present);
  present.style.animationDuration = duration + 's';
  
  setTimeout(() => {
    present.remove();
  }, duration * 1000);
}

function initFallingPresents() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      createFallingPresent();
    }, i * 2000);
  }
  
  setInterval(() => {
    createFallingPresent();
  }, 2500);
}

/**
 * Interactive Presents - Click to unwrap
 */
function initInteractivePresents() {
  const presents = document.querySelectorAll('.present');
  const giftEmojis = ['🎁', '📦', '🎀', '🎈', '🍬', '🍭', '⭐', '🎊', '🎉', '✨'];
  
  presents.forEach(present => {
    present.addEventListener('click', () => {
      const randomGift = giftEmojis[Math.floor(Math.random() * giftEmojis.length)];
      present.textContent = randomGift;
      present.style.animation = 'bounce 0.5s ease';
      
      setTimeout(() => {
        present.textContent = '🎁';
        present.style.animation = '';
      }, 2000);
    });
  });
}

/**
 * Moving Grinch - Occasionally moves around
 */
function initMovingGrinch() {
  const grinch = document.getElementById('grinch');
  if (!grinch) return;
  
  let grinchX = 80; // Starting position
  let direction = 1; // 1 for right, -1 for left
  
  setInterval(() => {
    grinchX += direction * 0.5;
    if (grinchX > 85 || grinchX < 75) {
      direction *= -1;
    }
    grinch.style.left = grinchX + '%';
  }, 100);
}

/**
 * Santa Dropping Presents - Santa flies across and drops clickable presents
 */
function initSantaDropPresents() {
  const flyingSanta = document.getElementById('flyingSanta');
  console.log('🎅 Looking for flyingSanta element:', flyingSanta);
  if (!flyingSanta) {
    console.error('❌ flyingSanta element not found!');
    return;
  }
  console.log('✅ flyingSanta element found, initializing Santa flight system');
  
  let dropInterval;
  
  // Function to start dropping presents when Santa flies
  function startDropping() {
    dropInterval = setInterval(() => {
      dropPresent();
    }, 800); // Drop a present every 800ms during flight
  }
  
  // Function to stop dropping when Santa finishes flying
  function stopDropping() {
    if (dropInterval) {
      clearInterval(dropInterval);
      dropInterval = null;
    }
  }
  
  // Function to drop a present
  function dropPresent() {
    const present = document.createElement('div');
    present.classList.add('dropped-present');
    present.textContent = '🎁';
    
    // Get Santa's current position relative to the scene
    const sceneContainer = document.querySelector('.scene-container');
    const sceneRect = sceneContainer.getBoundingClientRect();
    const santaRect = flyingSanta.getBoundingClientRect();
    const presentX = santaRect.left - sceneRect.left - 15; // Center under Santa relative to scene
    
    present.style.left = presentX + 'px';
    present.style.top = (santaRect.top - sceneRect.top + santaRect.height) + 'px';
    
    sceneContainer.appendChild(present);
    
    // Make present fall
    let presentY = parseFloat(present.style.top);
    const fallSpeed = 2;
    
    const fallInterval = setInterval(() => {
      presentY += fallSpeed;
      present.style.top = presentY + 'px';
      
      // Stop falling when it hits the ground (bottom of scene container)
      if (presentY > sceneRect.height * 0.85) { // 85% of scene height
        clearInterval(fallInterval);
        present.style.position = 'absolute';
        present.style.bottom = '5%';
        present.style.top = 'auto';
        present.style.left = presentX + 'px';
        present.style.pointerEvents = 'auto'; // Now clickable
        
        // Make it clickable after it lands
        present.addEventListener('click', () => unboxPresent(present));
      }
    }, 16);
    
    // Remove present after 10 seconds if not clicked
    setTimeout(() => {
      if (present.parentNode) {
        present.remove();
      }
    }, 10000);
  }
  
  // Function to unbox the present
  function unboxPresent(present) {
    const toys = ['🧸', '🚗', '🎈', '🍭', '⭐', '🎨', '🪁', '🎪', '🎠', '🦄'];
    const rareToy = '🦌'; // Rudolf
    
    // 5% chance for Rudolf, otherwise random toy
    const isRudolf = Math.random() < 0.05;
    const toy = isRudolf ? rareToy : toys[Math.floor(Math.random() * toys.length)];
    
    present.textContent = toy;
    present.style.animation = 'bounce 0.5s ease';
    present.style.pointerEvents = 'none'; // Prevent multiple clicks
    
    // Show message if Rudolf
    if (isRudolf) {
      showRudolfMessage();
    }
    
    // Remove after 3 seconds
    setTimeout(() => {
      present.remove();
    }, 3000);
  }
  
  // Function to show Rudolf message
  function showRudolfMessage() {
    const message = document.createElement('div');
    message.textContent = '🎄 You found Rudolf! 🦌';
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(45deg, #ff0000, #ff4444);
      color: #fff;
      padding: 30px 40px;
      border-radius: 20px;
      font-size: 2rem;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      border: 4px solid #ffd700;
      z-index: 1000;
      animation: rudolfCelebration 2s ease-in-out;
      box-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 3000);
  }
  
  // Function to show Santa hint
  function showSantaHint() {
    const hint = document.createElement('div');
    hint.textContent = '🎅 Santa is coming! Watch the sky! 🎅';
    hint.style.cssText = `
      position: fixed;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 215, 0, 0.9);
      color: #8B4513;
      padding: 15px 25px;
      border-radius: 25px;
      font-size: 1.2rem;
      font-weight: bold;
      text-shadow: 1px 1px 2px rgba(255,255,255,0.5);
      z-index: 1000;
      animation: hintPulse 1.5s ease-in-out infinite;
      border: 3px solid #ff0000;
      pointer-events: none;
    `;
    document.body.appendChild(hint);
    
    setTimeout(() => {
      hint.remove();
    }, 2000);
  }
  
  // Start the Santa flight cycle
  function startSantaFlight() {
    console.log('🎅 STARTING SANTA FLIGHT!');
    // Reset Santa position
    flyingSanta.style.left = '-150px';
    flyingSanta.style.top = '20%';
    flyingSanta.style.display = 'block';
    console.log('🎅 Santa positioned and made visible');
    
    // Animate Santa across the screen
    let startTime = Date.now();
    const duration = 8000; // 8 seconds flight
    const startX = -150;
    const endX = window.innerWidth + 150;
    
    function animateSanta() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Move Santa from left to right
      const currentX = startX + (endX - startX) * progress;
      flyingSanta.style.left = currentX + 'px';
      
      // Add some vertical movement (sine wave)
      const verticalOffset = Math.sin(progress * Math.PI * 4) * 30; // 4 waves during flight
      flyingSanta.style.top = `calc(20% + ${verticalOffset}px)`;
      
      if (progress < 1) {
        requestAnimationFrame(animateSanta);
      } else {
        flyingSanta.style.display = 'none';
        console.log('🎅 Santa flight completed, scheduling next flight');
        scheduleNextFlight(); // Schedule the next flight after this one completes
      }
    }
    
    // Start dropping presents 1 second into the flight
    setTimeout(() => {
      startDropping();
    }, 1000);
    
    // Stop dropping after 7 seconds (1 second before end)
    setTimeout(() => {
      stopDropping();
    }, 7000);
    
    // Start animation
    requestAnimationFrame(animateSanta);
  }
  
  // Start Santa flights every 5-8 seconds (more frequent)
  function scheduleNextFlight() {
    const delay = Math.random() * 3000 + 5000; // 5-8 seconds
    
    setTimeout(() => {
      // Show a hint that Santa is coming
      showSantaHint();
      
      // Start flight after 1.5 seconds
      setTimeout(() => {
        startSantaFlight();
        scheduleNextFlight(); // Schedule the next one
      }, 1500);
    }, delay);
  }
  
  // Start the first flight immediately (after a short delay)
  console.log('⏰ Scheduling first Santa flight in 2 seconds...');
  setTimeout(() => {
    console.log('🚀 Starting first Santa flight now!');
    startSantaFlight();
    // Don't schedule next flight here - let the flight completion handle it
  }, 2000); // Start first flight after 2 seconds
}

function initScene() {
  initSnowflakes();
  initInteractivePresents();
  initMovingGrinch();
  initHoHoHo();
  initSantaDropPresents();
  console.log('🎄 Christmas Scene Initialized');
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', initScene);
