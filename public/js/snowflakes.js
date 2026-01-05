/**
 * Snowflakes Animation System
 * Creates realistic falling snowflakes with different speeds, sizes, and opacity
 */

const snowflakeTypes = ['❄', '❅', '❆'];

function createSnowflake() {
  const container = document.getElementById('snowflakesContainer');
  
  if (!container) return;
  
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  
  // Random snowflake type
  const snowflakeChar = snowflakeTypes[Math.floor(Math.random() * snowflakeTypes.length)];
  snowflake.textContent = snowflakeChar;
  
  // Random size (1em to 2em)
  const size = Math.random() * 1 + 1;
  snowflake.style.fontSize = size + 'em';
  
  // Random horizontal position
  const startX = Math.random() * 100;
  snowflake.style.left = startX + '%';
  
  // Random fall duration (3-8 seconds)
  const duration = Math.random() * 5 + 3;
  snowflake.style.animationDuration = duration + 's';
  
  // Random horizontal drift
  const drift = (Math.random() - 0.5) * 100;
  snowflake.style.setProperty('--drift', drift + 'px');
  
  // Random opacity
  const opacity = Math.random() * 0.5 + 0.5;
  snowflake.style.opacity = opacity;
  
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
    }, i * 200);
  }
  
  // Continuously create new snowflakes (more frequent)
  setInterval(createSnowflake, 150);
}

// Start snowflakes when DOM is ready
document.addEventListener('DOMContentLoaded', initSnowflakes);
