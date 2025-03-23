import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected: ", socket.id);
    });
    socket.on("receive-message", (message) => {
      setChats((prevChats) => [...prevChats, message]);
      console.log(message);
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Enter Message
              </label>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                className="form-control"
                id="messageId"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="row">
          <ul>
            {chats.map((val, i) => (
              <li key={i}>{val}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
