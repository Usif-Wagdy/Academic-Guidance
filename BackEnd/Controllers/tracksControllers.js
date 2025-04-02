const Track = require("../Models/trackModel");


const getAllTracks = async (req, res) => {
    try {
        const tracks = await Track.find();
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
        const { name, description, sections } = req.body;

        if (!Array.isArray(sections)) {
            return res.status(400).json({
                message: 'Sections must be an array',
            });
        }

        const isValidSections = sections.every(
            (section) => section.title && section.content
        );

        if (!isValidSections) {
            return res.status(400).json({
                message: 'Each section must have a title and content',
            });
        }

        const newTrack = new Track({
            name,
            description,
            sections,
        });

        const savedTrack = await newTrack.save();

        res.status(201).json({
            message: 'Track added successfully',
            track: savedTrack,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add track',
            error: error.message,
        });
    }
};

const deleteTrack = async (req, res) => {
    try {
        await Track.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: "Track deleted successfully",
        });
    } catch (err) {
        res.status(404).json({ status: "fail", message: err });
    }
};

module.exports = { getAllTracks, addTrack, deleteTrack };