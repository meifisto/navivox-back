import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true }) // Active CORS si l'app Flutter tourne sur un autre domaine
export class WebSocketGatewayService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log(`🟢 Client connecté : ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`🔴 Client déconnecté : ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data) {
    console.log(`📩 message received : ${data}`);
    this.server.emit('message', { text: `Welcome back !` });
  }

  @SubscribeMessage('instruction')
  handleInstruction(@MessageBody() data) {
    console.log(`📩 instruction received : ${data}`);
    this.server.emit('instruction', { text: `In processing !` });
  }

}
