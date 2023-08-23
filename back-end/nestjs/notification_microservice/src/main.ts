import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const ioAdapter = new IoAdapter(app);
  app.useWebSocketAdapter(ioAdapter);

  const server = app.getHttpServer();

  ioAdapter.createIOServer(server, {
    cors: {
      origin: '*',
    },
  });

  await app.listen(3000);
}

bootstrap();
