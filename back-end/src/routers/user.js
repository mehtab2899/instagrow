const express = require("express"),
	User = require("../models/registers"),
	router = new express.Router();

// login methods and rendering
router.get("/", (req, res) => {
	res.render("login");
});

router.post("/login", async (req, res) => {
	try {
		const email = req.body.email,
			password = req.body.password;

		const userLogin = await User.findOne({ email });

		if (userLogin.password === password) {
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
		const registered = await user.save();
		res.status(201).render("index");
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
