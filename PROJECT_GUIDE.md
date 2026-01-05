# Holiday Routes - Complete Website

A festive holiday-themed website with three pages: home, Christmas scene, and an interactive Santa flight game!

## 📁 Project Structure

```
public/
├── index.html                 # Home page (North Pole themed)
├── christmas.html            # Christmas scene page
├── game.html                 # Interactive Santa flight game
├── home-style.css            # Home page styling
├── christmas-style.css       # Christmas scene styling
├── game-style.css            # Game styling
├── style.css                 # Legacy/shared styles
├── images/                   # Image assets folder (ready for your images)
│   ├── santa-sleigh.png     # Santa's sleigh
│   ├── reindeer.png         # Reindeer
│   ├── grinch.png           # Grinch character
│   ├── presents.png         # Presents
│   ├── trees.png            # Trees
│   ├── houses.png           # Houses
│   └── ...                  # Other assets as needed
└── js/
    ├── snowflakes.js        # Reusable snowflake animation system
    ├── christmas.js         # Christmas scene functionality
    └── game.js              # Santa flight game logic

```

## 🎮 Pages Overview

### 1. **Home Page** (`/`)
- **Features:**
  - "Welcome to the North Pole" hero section
  - Realistic animated snowflakes (different speeds, sizes, opacity)
  - Navigation buttons to Christmas scene and game
  - Responsive design
  - Glowing text animations

### 2. **Christmas Scene** (`/christmas`)
- **Features:**
  - Animated snowfall
  - Houses with chimneys
  - Animated trees (sway animation)
  - Santa's sleigh with floating animation
  - Reindeer (bobbing animation)
  - Presents on ground (sparkling animation)
  - Grinch character
  - Falling presents that land in chimneys
  - Snow accumulation at the bottom
  - Back button to home

### 3. **Game Page** (`/game`)
- **Features:**
  - Interactive Santa flight game
  - Player controls Santa horizontally with arrow keys or WASD
  - Falling presents as obstacles
  - Collision detection
  - Score and distance tracking
  - Difficulty increases as you progress
  - Win condition: Reach the Grinch
  - Lose condition: Hit by a falling present
  - Start/Retry/Restart buttons
  - Navigation back to home

## 🎨 Image Assets Required

Place these images in `/public/images/`:

### Required Images:
1. **santa-sleigh.png** - Red sleigh with Santa
   - Recommended: 80x40px, transparent background
   
2. **reindeer.png** - Individual reindeer sprite
   - Can use emoji as fallback (🦌)
   
3. **grinch.png** - Grinch character
   - Recommended: Standing pose, transparent background
   
4. **presents.png** - Gift boxes
   - Recommended: Multiple present designs
   - Can use emoji as fallback (🎁)
   
5. **trees.png** - Pine/Christmas trees
   - Recommended: Multiple tree variations
   
6. **houses.png** - Houses with roofs
   - Recommended: Winter cottage style

## ⌨️ Game Controls

- **Arrow Keys:** Move Santa up/down/right
- **WASD:** Alternative movement controls
  - W/↑ - Move Up
  - S/↓ - Move Down
  - D/→ - Move Right
  - A/← - Move Left

## 🚀 Running the Server

```bash
npm install
npm start
# or
node index.js
```

Server runs on `http://localhost:3000`

## 📊 Game Mechanics

### Scoring System:
- **Avoid Presents:** +10 points per present avoided
- **Progress:** Track percentage distance to Grinch
- **Difficulty:** Obstacle spawn rate increases with distance

### Collision Detection:
- Circle-based collision between Santa and falling presents
- Instant game over on collision
- Smooth reset for retry

### Win Condition:
- Reach the Grinch (right side of screen)
- Display final score and distance

## 🎨 Styling Features

- Gradient backgrounds (winter blues)
- Glassmorphism effect (frosted glass UI)
- Smooth animations and transitions
- Responsive design (mobile-friendly)
- Text shadows for depth
- Smooth snowfall animation system

## 💡 JavaScript Features

### Snowflakes System (`snowflakes.js`)
- Random snowflake types
- Variable speeds (3-8 seconds)
- Variable sizes and opacity
- Horizontal drift for realism
- Reusable across all pages

### Christmas Scene (`christmas.js`)
- Falling presents animation
- Chimney interaction
- Automatic cleanup of off-screen elements

### Game Engine (`game.js`)
- Full game state management
- Keyboard input handling
- Collision detection algorithm
- Difficulty progression
- Score tracking
- Win/lose conditions

## 📱 Responsive Design

All pages are optimized for:
- Desktop (1920px+)
- Tablet (768px - 1920px)
- Mobile (360px - 768px)

## 🔧 Customization

### Change Colors:
- Edit CSS gradient values in style files
- Modify `rgba()` color values for transparency

### Adjust Game Difficulty:
- Modify `santaSpeed` in `game.js` (line 18)
- Change obstacle spawn rate (line 294)
- Adjust collision threshold (line 160)

### Customize Animations:
- Edit `@keyframes` in CSS files
- Modify animation duration/delay values

## 📝 Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Future Enhancement Ideas

- Multiple game levels
- Sound effects
- Leaderboard system
- More obstacle types
- Power-ups
- Animated GIF/WebP support for image assets
- Mobile touch controls
- Multiplayer mode

---

**Created:** December 2025  
**Theme:** Holiday/Christmas  
**Technologies:** HTML5, CSS3, Vanilla JavaScript, Express.js
