const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");

const router = express.Router();

const upload = multer({ dest: "temp_uploads/" }); // Temp folder

router.post("/analyze-cv", upload.single("cv"), async (req, res) => {
    try {
        const filePath = req.file.path;
        const originalName = req.file.originalname;
        const form = new FormData();

        form.append("file", fs.createReadStream(filePath), originalName);

        // GET THE CORRECT CONTENT-LENGTH HEADER
        const contentLength = await new Promise((resolve, reject) => {
            form.getLength((err, length) => {
                if (err) reject(err);
                resolve(length);
            });
        });

        const flaskResponse = await axios.post("http://127.0.0.1:5050/upload", form, {
            headers: {
                ...form.getHeaders(),
                'Content-Length': contentLength
            }
        });

        const rawAnalysis = flaskResponse.data.cv_analysis;

        const parsedAnalysis = JSON.parse(rawAnalysis);

        fs.unlinkSync(filePath);

        res.status(200).json({ success: true, data: parsedAnalysis });
        console.log("CV analysis successful:", parsedAnalysis);

    } catch (error) {
        console.error("CV analysis failed:", error.response?.data || error.message);
        res.status(500).json({ success: false, error: "CV processing failed." });
    }
});

module.exports = router;
