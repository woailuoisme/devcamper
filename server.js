const http = require('http');
const os = require('os');
const express = require('express');
const dotenv = require('dotenv');
const color = require('colors');
const conndb = require('./utils/db');
const errorHandler = require('./middleware/error');
const log = require('./utils/logger');

const morgan = require('morgan');
const expressPino = require('express-pino-logger')({
	logger: log
});

//load env vars
dotenv.config({ path: '.env' });

//connected db
conndb();

const app = express();

//××××××××××××××××-mount all middleware-×××××××××××××//

//dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
	app.use(expressPino);
}

//body parser url query use qs lib
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//××××××××××××××××××××××××××××××××××××××××××××××××××//
//import router
const bootcamp = require('./routers/bootcamp');
const course = require('./routers/course');
//mount router
app.use('/api/v1/bootcamps', bootcamp);
app.use('/api/v1/courses', course);

//error handler
app.use(errorHandler);

const PORT = process.env.PORT;

// const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgGreen.bold));
//
const welcome = p => () => log.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}`.green.inverse);
http.createServer(app).listen(PORT, welcome(PORT));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	// Close server & exit process
	server.close(() => process.exit(1));
});
