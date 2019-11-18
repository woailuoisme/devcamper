const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slugify = require('slugify');
const validator = require('validator');
const moment = require('moment');

const BootcampSchema = new Schema({
	// user: {
	// 	type: Schema.types.ObjectId
	// },
	name: {
		type: String,
		trim: true,
		required: [true, 'Please add a name'],
		index: true,
		unique: true,
		maxlength: [50, 'Name can not be more than 50 characters']
	},
	slug: String,
	description: {
		type: String,
		trim: true,
		required: [true, 'Please add a description'],
		maxlength: [200, 'description can not be more than 200 characters']
	},
	website: {
		type: String,
		validate: {
			validator: v => validator.isURL(v),
			message: props => `${props.value} is not a valid url!`
		}
	},
	phone: {
		type: String,
		maxlength: [20, 'Phone number can not be longer than 20 characters']
	},
	email: {
		type: String,
		validate: {
			validator: v => validator.isEmail(v),
			message: props => `${props.value} is not a valid email!`
		}
	},
	address: {
		type: String,
		required: [true, 'Please add an address']
	},
	careers: {
		// Array of strings
		type: [String],
		required: true,
		enum: ['Web Development', 'Mobile Development', 'UI/UX', 'Data Science', 'Business', 'Other']
	},
	housing: {
		type: Boolean,
		default: false
	},
	jobAssistance: {
		type: Boolean,
		default: false
	},
	jobGuarantee: {
		type: Boolean,
		default: false
	},
	acceptGi: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: String,
		default: () => moment().format('YYYY-MM-DD HH:mm:ss')
	}
});

BootcampSchema.plugin(uniqueValidator, { message: "'{VALUE}' of '{PATH}' to be unique." });

// Create bootcamp slug from the name
BootcampSchema.pre('save', function(next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

module.exports = Bootcamp = mongoose.model('Bootcamp', BootcampSchema);
