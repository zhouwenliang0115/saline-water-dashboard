import express from 'express';
import http from 'http';
import WebSocket from 'ws';

// Initialize Express app
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Setup WebSocket server
const wss = new WebSocket.Server({ server });

// Function to broadcast data to all connected clients
const broadcast = (data: any) => {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};

// Sample data for monitoring (this would typically come from sensors)
let pondData = {
    temperature: 22.5,
    pHLevel: 7.2,
    salinity: 5.0
};

// API Endpoint to get pond data
app.get('/api/pondData', (req, res) => {
    res.json(pondData);
});

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('New client connected');

    // Send initial data on connection
    ws.send(JSON.stringify(pondData));

    // Handle WebSocket messages from clients
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        
        // For example, you could implement commands to update pond data
        // In a real scenario, you would validate and handle messages as needed
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Function to simulate pond data updates (for demonstration)
const updatePondData = () => {
    pondData.temperature = parseFloat((Math.random() * 10 + 20).toFixed(2));
    pondData.pHLevel = parseFloat((Math.random() * 2 + 6).toFixed(2));
    pondData.salinity = parseFloat((Math.random() * 10).toFixed(2));

    // Broadcast the updated data
    broadcast(pondData);
};

// Update pond data every 5 seconds
setInterval(updatePondData, 5000);

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
