const ErrorResponse = require('../utils/ErrorResponse');
const asynHandler = require('../middleware/async');
const Bootcamp = require('../models/bootcamp');
/**
 * @desc  get all bootcamp
 * @route /api/v1/bootcamps
 * @access public
 */
const index = asynHandler(async (req, res, next) => {
	const bootcamps = await Bootcamp.find({});
	res.status(200).json({
		success: true,
		data: bootcamps
	});
});
/**
 * @desc  create single bootcamp
 * @route /api/v1/bootcamps
 * @access public
 */
const create = asynHandler(async (req, res, next) => {
	// console.log(req.body);
	const bootcamp = await Bootcamp.create(req.body);
	res.status(201).json({
		success: true,
		data: bootcamp
	});
});

/**
 * @desc  get single bootcamp
 * @route /api/v1/bootcamps/:id
 * @access public
 */
const show = asynHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);
	if (!bootcamp) {
		return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
	}
	res.status(200).json({
		success: true,
		data: bootcamp
	});
});

/**
 * @desc  update single bootcamp
 * @route /api/v1/bootcamps/:id
 * @access public
 */
const update = asynHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		context: 'query' //mongoose-unique-validator docs
	});
	if (!bootcamp) {
		return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
	}
	res.status(200).json({ success: true, data: bootcamp });
});

/**
 * @desc  delete single bootcamp
 * @route /api/v1/bootcamps/:id
 * @access public
 */
const destroy = asynHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
	if (!bootcamp) {
		return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
	}
	res.status(200).json({
		success: true,
		data: bootcamp,
		msg: `delete single bootcamp ${req.params.id}`
	});
});

module.exports = BootcampController = {
	index,
	show,
	update,
	destroy,
	create
};
