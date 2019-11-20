const mongoose = require('mongoose');
const logger = require('./logger');
const connectDB = async () => {
	const conn = await mongoose.connect(process.env.MONGO_URI_LOCAL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	});
	logger.info(`Mongodb connect on ${conn.connection.host}`.cyan.underline.bold);

	conn.connection.on('error', err => {
		logger.error(err);
	});
};

module.exports = connectDB;
