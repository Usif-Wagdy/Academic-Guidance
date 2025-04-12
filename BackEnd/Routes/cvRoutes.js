const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");

const router = express.Router();

const upload = multer({ dest: "temp_uploads/" });

router.post("/analyze-cv", upload.single("cv"), async (req, res) => {
    try {

        console.log("File uploaded:", req.file);

        const filePath = req.file.path;
        const originalName = req.file.originalname;
        const form = new FormData();

        form.append("cv", fs.createReadStream(filePath), originalName);


        console.log("Form Headers:", form.getHeaders());


        const contentLength = await new Promise((resolve, reject) => {
            form.getLength((err, length) => {
                if (err) reject(err);
                resolve(length);
            });
        });

        console.log("Form Headers with Content-Length:", form.getHeaders());
        console.log("Content-Length:", contentLength);


        const flaskResponse = await axios.post("http://127.0.0.1:5000/analyze_cv", form, {
            headers: {
                ...form.getHeaders(),
                'Content-Length': contentLength
            }
        });


        console.log("Flask Response:", flaskResponse.data);


        const rawAnalysis = flaskResponse.data;


        console.log("Raw Flask Analysis:", rawAnalysis);


        fs.unlinkSync(filePath);


        res.status(200).json({
            success: true,
            data: rawAnalysis
        });
        console.log("CV analysis successful:", rawAnalysis);

    } catch (error) {

        console.error("CV analysis failed:", error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: "CV processing failed."
        });
    }
});

module.exports = router;