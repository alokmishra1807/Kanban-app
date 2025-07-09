// src/socket.js
import { io } from "socket.io-client";
import { backendUrl } from "./context/AuthContext";

export const socket = io(`${backendUrl}`, {
  withCredentials: true,
});
