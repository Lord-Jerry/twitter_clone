const mongoose = require('mongoose');
const schema = mongoose.Schema;
const tweets = new schema({
	tweet: {
		type: String,
		required: true,
		unique: false,
	},
	user: {
		type: Object,
		required: true,
		unique: false,
	},
	favs: {
		type: Number,
		required: true,
		unique: false,
		default: 0,
	},
	comments: {
		type: Object,
		required: false,
		unique: false,
	},
	retweets: {
		type: Number,
		required: true,
		unique: false,
		default: 0
	},
	retweet: {
		type: Object || Boolean,
		required: false,
		unique: false
	},
	date_created: {
		type: Date,
		required: true,
		unique: false,
		default: Date.now()
	}
})
module.exports = mongoose.model('tweets',tweets);