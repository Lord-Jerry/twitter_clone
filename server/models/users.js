const mongoose = require('mongoose');
const schema = mongoose.Schema;
const users = new schema({
	name: {
		first: {
			type: String,
			required: true,
			unique: false,
			maxlength: 30,
		},
		last: {
			type: String,
			required: true,
			unique: false,
			maxlength: 30,
		},
		middle: {
			type: String,
			required: true,
			unique: false,
			maxlength: 30
		},
		user: {
			type: String,
			required: true,
			unique: true,
			maxlength: 20
		},
		display: {
			type: String,
			required: true,
			unique: false,
			maxlength: 30,
		},
	},
	email: {
		type: String,
		required: true,
		unique: true,
		maxlength: 40,
	},
	password: {
		type: String,
		required: true,
		unique: false,
		maxlength: 70,
	},
	birth_date: {
		type: Date,
		required: false,
		unique: false,
	},
	date_reg: {
		type: Date,
		required: true,
		unique: false,
		default: Date.now(),
	},
	bio: {
		type: String,
		required: false,
		unique: false,
		maxlength: 100,
	},
	sex: {
		type: String,
		required: true,
		unique: false,
	},
	user_level: {
		type: Number,
		required: true,
		unique: false,
		default: 1,
	},
	picture: {
		profile: {
			type: String,
			required: true,
			unique: false,
			default: 'images/nopic.png',
		},
		cover: {
			type: String,
			required: true,
			unique: false,
			default: 'images.nocover.png'
		}
	},
	followers: {
		type: Array,
		required: false,
		unique: false,
	},
	following: {
		type: Array,
		required:false,
		unique: false
	}
});
module.exports = mongoose.model('users',users);