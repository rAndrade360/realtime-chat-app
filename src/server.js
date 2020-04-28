import express from "express";
import http from "http";
import socketio from "socket.io";
import path from "path";
import ejs from "ejs";

const App = express();
const server = http.createServer(App);
const io = socketio(server);

App.use(express.static(path.join(__dirname, "..", "public")));
App.set("views", path.join(__dirname, "..", "public"));
App.engine("html", ejs.renderFile);
App.set("view engine", "html");

App.use("/", (req, res) => res.send("index.html"));

let messages = [];

io.on("connection", (socket) => {
  socket.on("sendMessage", (message) => {
    messages.push(message);
    socket.broadcast.emit("receivedMessage", message);
  });

  socket.emit("previousMessages", messages);
});

server.listen(3333);
