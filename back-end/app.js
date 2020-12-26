// requiring modules from npm
const express = require("express"),
	hbs = require("hbs"),
	userRouter = require("./src/routers/user"),
	path = require("path");

// requiring of db
require("./src/db/connect");
const User = require("./src/models/registers");

// declaring constants
const app = express(),
	PORT = process.env.PORT || 3000,
	static_path = path.join(__dirname, "./public"),
	partials_path = path.join(__dirname, "./templates/partials"),
	template_path = path.join(__dirname, "./templates/views");

// set the templating engine and routing
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);

// listing to port
app.listen(PORT, () => {
	console.log(`server runs on ${PORT}`);
});
