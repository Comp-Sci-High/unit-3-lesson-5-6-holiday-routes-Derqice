// Import the Express library so we can create a server
const express = require("express")

// Create an Express application (this is your server)
const app = express()

// Tell the server to serve static files (HTML, CSS, JS, images)
// from the "public" folder
app.use(express.static(__dirname + "/public"))

// Create a route handler for the home page ("/")
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})

// Start the server and have it listen on port 3000
app.listen(3000, () => {
  console.log(`🎄 Holiday Server is Running! 🎄`)
  console.log(`🌐 Open your browser and go to: http://localhost:3000`)
  console.log(`🎮 Enjoy your holiday website! Press Ctrl+C to stop the server.`)
});

// Keep the server running
setInterval(() => {
  // Keep alive
}, 1000);
