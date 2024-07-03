import express from 'express';
import axios from "axios";

const app = express();
const PORT = 6000;
const WEATHER_API_KEY = 'ff9b7b2424b1421e94b74126240307';

app.get('/api/hello', async (req, res) => {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    try {
        // Get client location based on IP
        const locationResponse = await axios.get(`http://ip-api.com/json/${clientIp}`);
        const clientLocation = locationResponse.data.city || 'Unknown Location';

        // Get weather information based on location
        const weatherResponse = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${clientLocation}`);
        const temperature = weatherResponse.data.current.temp_c;

        const greeting = `Hello, maureen! The temperature is ${temperature} degrees Celsius in ${clientLocation}`;

        console.log(`clientIp: ${clientIp}, ClientLocation: ${clientLocation}, temperature: ${temperature}, greeting: ${greeting}`);

        const responseData = {
            clientIp: clientIp,
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