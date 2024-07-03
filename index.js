import express from 'express';
import axios from "axios";


// const express = require('express');
// const requestIp = require('request-ip');
const app = express();
const PORT = 6000;

app.get('/api/hello', (req, res) => {
   
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const clientLocation = "New York";
    const temperature = 11;
    const greeting = `Hello, Mark!, the temperature is ${temperature} degrees Celsius in ${clientLocation}`;

    console.log(`clientIp: ${clientIp},ClientLocation: ${clientLocation},temperature:${temperature},greeting:${greeting}`);

    const responseData = {
        clientIp: clientIp,
        location: clientLocation,
        temperature: temperature,
        greeting: greeting
    };

    res.json(responseData);

    
 

});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
});

