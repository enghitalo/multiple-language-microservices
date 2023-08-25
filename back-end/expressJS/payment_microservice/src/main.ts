import express from "express";
import * as bodyParser from "body-parser";
import * as jwt from "jsonwebtoken";
// import axios from "axios";

const app = express();
app.use(bodyParser.json());

// Chave secreta para assinatura dos tokens JWT
const jwtSecret = "yourSecretKey";

// Middleware de autenticação
app.use((req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  try {
    console.log(token);

    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido." });
  }
});

// Endpoint para processar pagamento
app.post("/payment", (req: any, res: any) => {
  const { amount, description } = req.body;

  // Processamento do pagamento fictício
  const payment = { amount, description };
  console.log({ payment });

  fetch("http://localhost:3001/notification", {
    method: "POST",
    body: JSON.stringify({}),
  }).then((value) => {
    console.log(value.body);

    return res.json({ message: "Pagamento processado com sucesso." });
  });
});

// Endpoint para listar pagamentos
app.get("/payments", (req: any, res: any) => {
  res.json([]);
});

// Iniciar o servidor
const port = 3002;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
