const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const moment = require('moment');

const CourseSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: [true, 'Please add a title for the review'],
			maxlength: 100
		},
		text: {
			type: String,
			required: [true, 'Please add some text']
		},
		rating: {
			type: Number,
			min: 1,
			max: 10,
			required: [true, 'Please add a rating between 1 and 10']
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
		// bootcamp: {
		//     type: mongoose.Schema.ObjectId,
		//     ref: 'Bootcamp',
		//     required: true
		// },
		// user: {
		//     type: mongoose.Schema.ObjectId,
		//     ref: 'User',
		//     required: true
		// }
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (doc, ret) => {
				ret.id = ret._id;
				delete ret._id;
				// delete ret.__v;
				ret.updatedAt = moment(ret.updatedAt).format('YYYY-MM-DD HH:mm:ss');
				ret.createdAt = moment(ret.createdAt).format('YYYY-MM-DD HH:mm:ss');
			}
			// virtuals: true
		}
	}
);

CourseSchema.plugin(uniqueValidator, { message: "'{VALUE}' of '{PATH}' to be unique." });

//function 不能使用箭头函数
const updateDate = function(next) {
	next();
};
// update date for bellow 4 methods
CourseSchema.pre('save', updateDate)
	.pre('update', updateDate)
	.pre('findOneAndUpdate', updateDate)
	.pre('findByIdAndUpdate', updateDate);

module.exports = Course = mongoose.model('Course', CourseSchema);
