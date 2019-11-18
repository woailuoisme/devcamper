const mongoose = require('mongoose');
const connectDB = async () => {
	const conn = await mongoose.connect(process.env.MONGO_URI_LOCAL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	});
	console.log(`Mongodb connect on ${conn.connection.host}`.cyan.underline.bold);

	conn.connection.on('error', err => {
		console.log(err);
	});
};

module.exports = connectDB;
