const crypto = require('crypto');
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const moment = require('moment');

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Please add a name']
	},
	email: {
		type: String,
		required: [true, 'Please add an email'],
		unique: true,
		validate: {
			validator: v => validator.isEmail(v),
			message: props => `${props.value} is not a valid email!`
		}
	},
	role: {
		type: String,
		enum: ['user', 'publisher'],
		default: 'user'
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6,
		select: false
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = model('User', UserSchema);
