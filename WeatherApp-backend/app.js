// // filepath: /d:/Lucenxia/LucenxiaWeatherApp/weather-app-backend/server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const authRoutes = require('./routes/auth');




// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());

// // Routes
// app.use('/api/auth', authRoutes);

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/weather-app', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }).catch(err => {
//   console.error('Failed to connect to MongoDB', err);
// });

import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connect } from './config/db_config.js';
import authRoutes from './routes/auth.js';


dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());


//Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, async () => {
    try {
      await connect();
      console.log(`User service is running on port ${PORT}`);
    } catch (error) {
      console.log(err);
    }
  });

