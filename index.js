import express from 'express';
import axios from "axios";

const app = express();
const PORT = 6000;
const WEATHER_API_KEY = 'ff9b7b2424b1421e94b74126240307';

app.get('/api/hello', async (req, res) => {
    const client_ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const visitorName = req.query.visitor_name || 'Guest';

    try {
        // Get client location based on IP
        const locationResponse = await axios.get(`http://ip-api.com/json/${client_ip}`);
        const clientLocation = locationResponse.data.city || 'Unknown Location';

        // Get weather information based on location
        const weatherResponse = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${clientLocation}`);
        const temperature = weatherResponse.data.current.temp_c;

        const greeting = `Hello, ${visitorName}! The temperature is ${temperature} degrees Celsius in ${clientLocation}`;

        console.log(`clientIp: ${client_ip}, ClientLocation: ${clientLocation}, temperature: ${temperature}, greeting: ${greeting}`);

        const responseData = {
            client_ip: client_ip,
            location: clientLocation,
            greeting: greeting
        };

        res.json(responseData);

    } catch (error) {
        console.error('Error fetching location or weather data:', error);
        res.status(500).json({ error: 'Failed to fetch location or weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});