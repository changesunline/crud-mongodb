var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/data')

var fruitSchema = new mongoose.Schema({
	title: String,
	describe :String
})

var stuSchehma = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	age: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		default: '男',
		enum: ['男','女'],
		required: true
	},
	hobby: {
		type: String,
	}
})

module.exports = mongoose.model('Student', stuSchehma)

