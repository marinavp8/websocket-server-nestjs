import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    MessageBody,
    ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class MyWebSocketGateway
    implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }
    @SubscribeMessage('message')
    handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
        console.log(data);
        //this.server.emit('messageserver', data);

        client.broadcast.emit('messageserver', data);
    }

    @SubscribeMessage('onNewUser')
    handleNewUser(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
        console.log(data);

        //connect to database
        //save user
        //read user

        //this.server.emit('messageserver', data);

        client.broadcast.emit('onNewUser', data);
    }

}