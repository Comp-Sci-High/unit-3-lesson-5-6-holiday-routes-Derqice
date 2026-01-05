const express = require("express")
const app = express()

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})

app.listen(3000, () => {
  console.log(`🎄 Holiday Server is Running! 🎄`)
  console.log(`🌐 Open your browser and go to: http://localhost:3000`)
  console.log(`🎮 Enjoy your holiday website! Press Ctrl+C to stop the server.`)
});

// Keep the server running
setInterval(() => {
  // Keep alive
}, 1000);
