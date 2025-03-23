import React, { useEffect } from "react";
import { io } from "socket.io-client";

export default function App() {
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected: ", socket.id);
    });
    socket.on("welcome", (msg) => {
      console.log(msg);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>App</div>;
}
