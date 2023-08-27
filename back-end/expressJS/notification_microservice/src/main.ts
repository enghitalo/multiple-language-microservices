import express from "express";
import http from "http";
// const socketIo = require("socket.io");
import { Server } from "socket.io"; // Importe o pacote cors
import cors from "cors"; // Importe o pacote cors

const app = express();

app.use(express.json());

const server = http.createServer(app);

interface ServerToClientEvents {
  statusUpdate: (message: string) => void;
}

const io = new Server<ServerToClientEvents>(server, {
  cors: { origin: "*" },
});

const PORT = 3001;

// Use o middleware cors para permitir as requisições do front-end
app.use(cors());

app.post("/notification", (req: any, res: any) => {
  io.emit("statusUpdate", req.body?.message ?? "Nova atualização de status!");
  res.sendStatus(200);
});

// app.get("/", (req, res) => {
//   console.log("salve");
//   res.sendStatus(200);
// });

io.on("connection", (socket) => {
  console.log("Novo cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
