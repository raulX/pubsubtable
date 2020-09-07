const express = require("express");

const citiesController = require("../controllers/cities-controller");

const router = express.Router();

router.get("/", citiesController.getCities);

router.get("/:cityId", citiesController.getCityById);

module.exports = router;
