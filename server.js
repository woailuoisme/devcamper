const express = require('express')
const dotenv =require('dotenv')


//load env vars
dotenv.config({ path: './config/config.env' });

//connected db
conndb();

const app = express();

//××××××××××××××××-mount all middleware-×××××××××××××//

//dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
//body parser
app.use(express.json());

//××××××××××××××××××××××××××××××××××××××××××××××××××//
//import router
const bootcamp = require('./routers/bootcamp');
//mount router
app.use('/api/v1/bootcamps', bootcamp);

//error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgGreen.bold));

// Handle unhandled promise rejections
// process.on('unhandledRejection', (err, promise) => {
// 	// console.log(`Error: ${err.message}`.red);
// 	// Close server & exit process
// 	// server.close(() => process.exit(1));
// });
