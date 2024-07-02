import express from 'express';
import requestIp from "request-ip";


// const express = require('express');
// const requestIp = require('request-ip');
const app = express();

const PORT = 6000;

app.get('/', (req, res) => {
    const clientIP = req.clientIp;
    const clientLocation = "New York";
    const temperature = 11;
    const greeting = `Hello, Mark!, the temperature is ${temperature} degrees Celsius in ${clientLocation}`;

    const responseData = {
        client_ip: clientIP,
        location: clientLocation,
        greeting: greeting
    };

    res.json(responseData);

    
 

});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
});