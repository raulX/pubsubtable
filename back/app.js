const express = require("express");
const bodyParser = require("body-parser");
const citiesRoutes = require("./routes/cities-routes");

const HttpError = require("./models/http-error");
const socket = require("./socket");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
	next();
});

app.use("/api/cities", citiesRoutes);

app.use((req, res, next) => {
	const error = new HttpError("Could not find this route.", 400);
	throw error;
});

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || "Unknown error" });
});

const server = app.listen(5000);

const io = require("./socket").init(server);
io.on(`connection`, socket=>{
	console.log('Client connected')
})
