import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { LocationService } from './services/locationService';
import routes from './routes/index';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Adjust this for security
    },
});

app.use(express.json());
app.use('/api', routes);

const locationService = new LocationService(io);
io.on('connection', (socket) => locationService.handleConnection(socket));

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
