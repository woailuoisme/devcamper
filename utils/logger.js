const pino = require('pino');

const fs = require('fs');
const path = require('path');
const multistream = require('pino-multi-stream').multistream;

// console.log(path.join(__dirname, '../tmp/info.stream.out'));
const streams = [
	{ stream: fs.createWriteStream(path.join(__dirname, '../tmp/info.stream.out')) },
	{ level: 'debug', stream: fs.createWriteStream(path.join(__dirname, '../tmp/info.stream.out')) },
	{ level: 'fatal', stream: fs.createWriteStream(path.join(__dirname, '../tmp/info.stream.out')) }
];
const l = pino(
	{
		name: process.env.APP_ID || 'express',
		level: process.env.LOG_LEVEL || 'debug'
		// prettyPrint: {
		// 	colorize: true,
		// 	translateTime: 'SYS:standard',
		// 	levelFirst: false,
		// 	messageFormat: false
		// 	// ignore: 'hostname', // --ignore,
		// }
	},
	multistream(streams)
);
l.debug('this will be written to /tmp/debug.stream.out');
l.info('this will be written to /tmp/debug.stream.out and /tmp/info.stream.out');
l.fatal('this will be written to /tmp/debug.stream.out, /tmp/info.stream.out and /tmp/fatal.stream.out');

module.exports = l;
