const { Schema, model } = require('mongoose');

const ReviewSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: [true, 'Please add a name']
		},
		text: {
			type: String,
			trim: true,
			required: [true, 'Please add a name']
		},
		rating: {
			type: Number
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
	{}
);

module.exports = Review = model('Review', ReviewSchema);
