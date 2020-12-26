const mongoose = require("mongoose"),
	validator = require("validator");

// defining schema of DB
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email is invalid");
			}
		},
	},
	name: {
		type: String,
	},
	username: {
		type: String,
		required: true,
		minlength: 3,
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
});

// create model of DB
const User = new mongoose.model("User", userSchema);

module.exports = User;
