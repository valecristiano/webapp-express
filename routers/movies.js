const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/moviesController");

router.get("/", moviesController.index);

router.get("/latest", moviesController.showLatest);

router.get("/bestrated", moviesController.showBestRated);

router.get("/:id", moviesController.show);

module.exports = router;
