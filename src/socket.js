import { io } from "socket.io-client";

const URL = "https://chattingappbackend-zkbx.onrender.com/";

export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
});
