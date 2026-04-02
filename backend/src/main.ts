import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());

// API endpoint for monitoring saline water ponds
app.get('/api/ponds', (req, res) => {
    // Sample data
    const ponds = [
        { id: 1, name: 'Pond A', salinity: 35 },
        { id: 2, name: 'Pond B', salinity: 28 }
    ];
    res.json(ponds);
});

// WebSocket connection
wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('message', (message) => {
        console.log(`Message from client: ${message}`);
    });

    // Example of sending a message to the client
    ws.send('Welcome to the saline water monitoring server!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});