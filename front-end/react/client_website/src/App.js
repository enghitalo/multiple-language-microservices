import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:3000");

const App = () => {
  useEffect(() => {
    socket.on("statusUpdate", (data) => {
      console.log("batata");
      notify(data);
    });

    /**
     * Comment this if it not work
     */
    return () => {
      socket.disconnect();
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
