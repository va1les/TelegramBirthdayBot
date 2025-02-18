const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	uid: { type: String, required: true },
	birthday: {
		type: Object, default: {
			year: null,
			month: null,
			day: null,
			notifications: true,
			notified: true,
		}
	},
});

module.exports = mongoose.model('User', UserSchema);