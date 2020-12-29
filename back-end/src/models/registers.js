const mongoose = require("mongoose"),
	bcrypt = require("bcryptjs"),
	jwt = require("jsonwebtoken"),
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
	token: [
		{
			token: {
				type: String,
				require: true,
			},
		},
	],
});

// generating the tokens

userSchema.methods.generateTokens = async function () {
	try {
		const token = await jwt.sign(
			{ _id: this.id.toString() },
			process.env.JWT_SECRETKEY
		);
		this.token = this.token.concat({ token });
		await this.save();
		return token;
	} catch (error) {
		res.send(error);
	}
};

// hashing the password
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
	}

	next();
});

// create model of DB
const User = new mongoose.model("User", userSchema);

module.exports = User;
