const ErrorResponse = require('../utils/ErrorResponse');
const asynHandler = require('../middleware/async');
const Course = require('../models/Course');
/**
 * @desc  get all course
 * @route /api/v1/courses
 * @access public
 */
const index = asynHandler(async (req, res, next) => {
	const courses = await Course.find();
	res.status(200).json({
		success: true,
		count: courses.length,
		data: courses
	});
});
/**
 * @desc  create single course
 * @route /api/v1/courses
 * @access public
 */
const create = asynHandler(async (req, res, next) => {
	const course = await Course.create(req.body);
	res.status(201).json({
		success: true,
		data: course
	});
});

/**
 * @desc  get single course
 * @route /api/v1/courses/:id
 * @access public
 */
const show = asynHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.id);
	if (!course) {
		return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
	}
	res.status(200).json({
		success: true,
		data: course
	});
});

/**
 * @desc  update single course
 * @route /api/v1/courses/:id
 * @access private
 */
const update = asynHandler(async (req, res, next) => {
	const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		context: 'query' //mongoose-unique-validator docs
	});
	if (!course) {
		return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
	}
	res.status(200).json({ success: true, data: course });
});

/**
 * @desc  delete single course
 * @route /api/v1/courses/:id
 * @access private
 */
const destroy = asynHandler(async (req, res, next) => {
	const course = await Course.findByIdAndDelete(req.params.id);
	if (!course) {
		return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
	}
	res.status(200).json({
		success: true,
		data: course,
		msg: `delete single course ${req.params.id}`
	});
});

module.exports = CourseController = {
	index,
	show,
	update,
	destroy,
	create
};
