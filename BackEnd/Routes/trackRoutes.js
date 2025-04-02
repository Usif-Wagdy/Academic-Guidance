const express = require("express");
const router = express.Router();
const { authMiddleware, allowedTo } = require("../Middlewares/authMiddleware");


const tracksControllers = require("../Controllers/tracksControllers");

router.route("/").get(tracksControllers.getAllTracks).post(authMiddleware, allowedTo('admin'), tracksControllers.addTrack);
router.route("/:id").delete(authMiddleware, allowedTo('admin'), tracksControllers.deleteTrack);

module.exports = router;