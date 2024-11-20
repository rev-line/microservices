import { Server, Socket } from 'socket.io';
import { Location } from '../@types/location';

interface ConnectedUser {
    socketId: string;
    location: Location;
}

export class LocationService {
    private io: Server;
    private connectedUsers: Map<string, ConnectedUser> = new Map();

    constructor(io: Server) {
        this.io = io;
    }

    public handleConnection(socket: Socket) {
        console.log(`User connected: ${socket.id}`);

        socket.on('locationUpdate', (location: Location) => {
            this.connectedUsers.set(socket.id, { socketId: socket.id, location });

            this.broadcastUserLocations();
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            this.connectedUsers.delete(socket.id);
            this.broadcastUserLocations();
        });
    }

    private broadcastUserLocations() {
        const users = Array.from(this.connectedUsers.values()).map((user) => user.location);
        this.io.emit('userLocations', users);
    }
}
