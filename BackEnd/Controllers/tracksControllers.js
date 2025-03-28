const track = require("../Models/trackModel");

const getAllTracks = async (req, res) => {
    try {
        const tracks = await track.find();
        res.status(200).json({
            status: "success",
            results: tracks.length,
            data: { tracks },
        });
    } catch (err) {
        res.status(404).json({ status: "fail", message: err });
    }
};

const addTrack = async (req, res) => {
    try {
        const { name, description, image } = req.body
        if (!name || !description || !image) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide name, description and image",
            });
        }
        const existingTrack = await track.findOne({ name });
        if (existingTrack) {
            return res.status(400).json({
                status: "fail",
                message: "Track already exists",
            });
        }
        const newTrack = await track.create({ name, description, image });
        res.status(201).json({
            status: "success",
            data: { track: newTrack },
        });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
};

const deleteTrack = async (req, res) => {
    try {
        await track.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: "Track deleted successfully",
        });
    } catch (err) {
        res.status(404).json({ status: "fail", message: err });
    }
};

module.exports = { getAllTracks, addTrack, deleteTrack };