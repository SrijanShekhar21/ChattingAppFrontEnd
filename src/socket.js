import { io } from "socket.io-client";

const URL = "https://chatapp-backend-swart-phi.vercel.app";

export const socket = io(URL, {
  autoConnect: false,
});
