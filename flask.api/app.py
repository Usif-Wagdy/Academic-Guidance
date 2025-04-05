from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from model import extract_text_from_pdf, extract_information

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_file():
    
    print("REQUEST FILES:", request.files)

    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    # استخراج النص من PDF
    cv_text = extract_text_from_pdf(filepath)
    
    # استخراج المعلومات
    result = extract_information(cv_text)

    return jsonify({"cv_analysis": result})

app.run(host="0.0.0.0", port=5050, debug=True)
