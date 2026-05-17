import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import expertRoutes from "./routes/expertRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

connectDB();

const app = express();

const httpServer =
  createServer(app);

export const io =
  new Server(
    httpServer,
    {
      cors: {
        origin: "*"
      }
    }
  );

app.use(cors());
app.use(express.json());

app.use(
  "/api/experts",
  expertRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);

app.get("/", (req, res) => {
  res.json({
    message:
      "API Running"
  });
});

io.on(
  "connection",
  socket => {

    console.log(
      "User connected:",
      socket.id
    );

    socket.on(
      "disconnect",
      () => {

        console.log(
          "User disconnected"
        );
      }
    );
  }
);

const PORT =
  process.env.PORT ||
  5000;

httpServer.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    );
  }
);