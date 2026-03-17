const { setServers } = require("node:dns/promises");
setServers(["1.1.1.1", "8.8.8.8"]);

const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoSanitize = require('@exortek/express-mongo-sanitize');
const helmet = require('helmet');
const { xss } = require('express-xss-sanitizer');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');


dotenv.config({ path: './config/config.env' });
connectDB();

const auth = require('./routes/auth');
const restaurants = require('./routes/restaurants.js');
const reservations = require('./routes/reservations');
const app = express();

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 50
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://testfe-fe.vercel.app', 
    credentials: true
}));
app.use(mongoSanitize()); 
app.use(helmet());        
app.use(xss());           
app.use(hpp());
app.use(limiter); 

app.use('/api/v1/auth', auth);
app.use('/api/v1/restaurants', restaurants);
app.use('/api/v1/reservations', reservations);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});