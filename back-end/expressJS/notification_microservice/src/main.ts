import express from "express";
import http from "http";
// import { sseController, sendSseEvent } from "./helpers/sse";

type SSEMessage = {
  id?: string;
  event?: string;
  data: string;
  retry?: number;
};

// Armazenar a lista de clientes SSE conectados
const clients: http.ServerResponse[] = [];

// Rota SSE para enviar eventos para o front-end
export const sseController = (req: express.Request, res: express.Response) => {
  console.log("sseController");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permitir acesso de diferentes origens

  // Configurar regras de reconexão
  res.setHeader("Retry", "10000");
  res.flushHeaders();

  // Adicionar a resposta do cliente SSE à lista de clientes
  clients.push(res);

  // Encerrar conexão quando o cliente fechar
  req.on("close", () => {
    console.log("connection closed");

    const index = clients.indexOf(res);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
};

// Função para enviar eventos SSE para todos os clientes conectados
export const sendSseEvent = (data: SSEMessage) => {
  console.log("sendSseEvent");

  for (const client of clients) {
    if (data.id) {
      client.write(`id: ${data.id}\n`);
    } else {
      client.write(`id: ${crypto.randomUUID()}\n`);
    }

    if (data.event) {
      client.write(`event: ${data.event}\n`);
    }

    client.write(`data: ${data.data}\n`);

    if (data.retry) {
      client.write(`retry: ${data.retry}\n`);
    }

    client.write(`\n`);
  }
};

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get("/sse", sseController);

// Rota para receber requisições de notificação de outros microserviços
app.post("/notification", (req: express.Request, res: express.Response) => {
  const eventData = req.body; // Dados da notificação recebida

  // Enviar os dados para os clientes SSE conectados
  sendSseEvent({
    data: eventData.message,
    retry: 3,
  });

  // Enviar os dados para os clientes escutado o evento específico
  sendSseEvent({
    event: "statusUpdate",
    data: eventData.message,
    retry: 3,
  });

  res.status(200).send("Notification received");
});

const port = 3001;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
