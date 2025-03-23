import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("HII");
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
