import { Server, Socket } from 'socket.io';
import { Location } from '../@types/location';

export class LocationService {
    private io: Server;

    constructor(io: Server) {
        this.io = io;
    }

    public handleConnection(socket: Socket) {
        console.log(`User connected: ${socket.id}`);
        socket.on('locationUpdate', (location: Location) => {
            console.log(`Received location from user ${location.userId}:`, location);
            socket.broadcast.emit('locationUpdate', location);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    }
}
