import express from 'express'
import dotenv from 'dotenv'
import connectToMongoose from './utils/connectMongoose.js';
import { v2 as cloudinary } from 'cloudinary';
import authRoutes from './routes/userRoute.js';
import taskRoutes from './routes/taskRoute.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import http from "http";
import { Server } from "socket.io";
import logRoutes from "./routes/log.Rotes.js";



const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://kanban-app-nu-pink.vercel.app/", 
    credentials: true,
  },
});





dotenv.config()

cloudinary.config({ 
  cloud_name: process.env.cloudinary_name, 
  api_key: process.env.cloud_Api_key, 
  api_secret: process.env.cloud_Api_Sec 
});

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,             
  })
);
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use(cookieParser());
app.use("/api/user",authRoutes);
app.use("/api/task",taskRoutes);
app.use("/api/logs", logRoutes);

server.listen(PORT, () => {
    connectToMongoose();
    console.log(`app is running on port ${PORT}`);
});