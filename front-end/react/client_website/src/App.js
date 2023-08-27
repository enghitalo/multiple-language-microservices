import React, { useEffect } from "react";
// import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Criar uma nova conexão SSE
const sse = new EventSource("http://localhost:3001/sse");

const App = () => {
  useEffect(() => {
    // Configurar o tratamento de eventos SSE recebidos
    sse.onmessage = (event) => {
      notify(event.data);
    };

    // custom events
    sse.addEventListener("statusUpdate", (event) => {
      notify(`statusUpdate: ${event.data}`);
    });

    // Lidar com reconexão
    sse.onerror = (event) => {
      if (event.readyState === EventSource.CLOSED) {
        console.log("Connection closed.");
      } else {
        console.error("Error:", event);
      }
      // sse.close();
    };
  }, []);

  const notify = (status) => {
    toast.success(`Status atualizado: ${status}`);
  };

  return (
    <div>
      <h1>Realtime Notification App</h1>
      <ToastContainer />
    </div>
  );
};

export default App;
