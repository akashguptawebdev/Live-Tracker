const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

// Set up middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Handle socket connection
io.on("connection", (socket) => {
    socket.on("send-location" , (data)=>{
        io.emit("receive-location", {id:socket.id, ...data})
    })
    socket.on("disconnect", ()=>{
        io.emit("user-disconnected", socket.id)
    })
    // You can handle other socket events here
});

// Define a route to render the "index" view
app.get("/", (req, res) => {
    res.render("index");
});

// Start the server
server.listen(3000, () => {
    console.log("Port 3000 is listening");
});
