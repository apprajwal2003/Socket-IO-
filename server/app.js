import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("HII");
});

io.on("connection", (socket) => {
  console.log("Socket connected");
  console.log(socket.id);
  socket.on("disconnect", () => {
    console.log("Disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
