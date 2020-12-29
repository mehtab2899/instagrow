// requiring modules
const express = require("express"),
	User = require("../models/registers"),
	bcrypt = require("bcryptjs"),
	jwt = require("jsonwebtoken"),
	router = new express.Router();

// login methods and rendering
router.get("/", (req, res) => {
	res.render("login");
});

router.post("/login", async (req, res) => {
	try {
		const email = req.body.email,
			password = req.body.password;

		// finding user from db
		const userLogin = await User.findOne({ email });

		// compare password from db
		const isMatch = await bcrypt.compare(password, userLogin.password);

		// generation token for login
		const token = await userLogin.generateTokens();

		// generation of cookies
		res.cookie("jwt", token, {
			expires: new Date(Date.now() + 50000),
			httpOnly: true,
		});

		// matching the user credentials
		if (isMatch) {
			res.status(201).render("index");
		} else {
			res.send("Invalid login details!");
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

// register methods and rendering
router.get("/register", (req, res) => {
	res.render("register");
});

router.post("/register", async (req, res) => {
	try {
		const email = req.body.email,
			name = req.body.name,
			username = req.body.username,
			password = req.body.password;

		const user = new User({
			email: email,
			name: name,
			username: username,
			password: password,
		});

		// token generation f'n calling
		const token = await user.generateTokens();

		// generation of cookies
		res.cookie("jwt", token, {
			expires: new Date(Date.now() + 50000),
			httpOnly: true,
		});

		// saving user details to db
		const registered = await user.save();
		res.status(201).render("index");
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
