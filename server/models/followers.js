const mongoose = require('mongoose');
const schema = mongoose.Schema;
const follower = new schema({
	following: {
		id: {
			type: String,
			required: true,
		 },
		name: {
			user: {
				type: String,
				required: true,
			},
			display: {
				type: String,
				required: true,
			}
		},
		avatar: {
			type: String,
			required: true,
		}
	},
	follower: {
		id: {
			type: String,
			required: true,
		},
		name: {
			user: {
				type: String,
				required: true,
			},
			display: {
				type: String,
				required: true,
			}
		},
		avatar: {
			type: String,
			required: true,
		}
	}
});
module.exports = mongoose.model('follower',follower);