import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Controller('notification')
export class NotificationController implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    // Certifique-se de que o servidor WebSocket esteja inicializado antes de usar
    if (this.server) {
      const status = 'Status atualizado'; // Substitua por qualquer lógica para obter o status atualizado
      this.server.emit('statusUpdate', status);
    }
  }

  @Get()
  sendNotification() {
    // if (this.server) {
    const status = 'Status atualizado'; // Substitua por qualquer lógica para obter o status atualizado
    this.server.emit('statusUpdate', status);
    return 'Notification sent';
    // }
  }
}
