import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PointsInterestsService } from './points_interests/points_interests.service';

@WebSocketGateway({ cors: { origin: '*'}, transports: ['websocket'] })
export class WebSocketGatewayService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly pointsInterestsService: PointsInterestsService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`🟢 Client connecté : ${client.id}, Args: ${args}`);
  }

  handleDisconnect(client: any) {
    console.log(`🔴 Client déconnecté : ${client.id}`);
  }

  // --------------------------------------------------------------------

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data) {
    console.log(`📩 message received : ${data}`);
    this.server.emit('message', { text: `Welcome back !` });
  }

  @SubscribeMessage('pointOfInterest')
  async handleInstruction(@MessageBody() data) {
    console.log(
      `📩 +++++++++++++++++++++++= position received from client : ${JSON.stringify(data, null, 2)}`,
    );
    const latitude = data.text.split(',')[0];
    const longitude = data.text.split(',')[1];
    const range = data.text.split(',')[2];
    console.log('latitude::: ', latitude);
    console.log('longitude::: ', longitude);
    console.log('range::: ', range);

    const points = await this.pointsInterestsService.getPoinOfInterests(
      longitude,
      latitude,
      range,
    );
    console.log('points récupérés ::: ', points);

    this.server.emit('pointOfInterest', { points });
  }
}
