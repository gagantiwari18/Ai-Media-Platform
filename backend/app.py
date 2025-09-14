from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import tempfile
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Google AI with environment variable
api_key = os.getenv('GOOGLE_AI_API_KEY')
if not api_key:
    raise ValueError("GOOGLE_AI_API_KEY environment variable is required")

genai.configure(api_key=api_key)

@app.route('/api/image-to-text', methods=['POST'])
def image_to_text():
    file = request.files['image']
    with tempfile.NamedTemporaryFile(delete=False) as temp:
        file.save(temp.name)
        file.seek(0)  # Reset file pointer to beginning
        model = genai.GenerativeModel('gemini-2.0-flash')
        img = {"mime_type": file.mimetype, "data": file.read()}
        res = model.generate_content([img, "Generate the prompt for image and return the generated text in markdown."])
        os.unlink(temp.name)  # Clean up temp file
        return jsonify({'text': res.text})

@app.route('/api/audio-to-text', methods=['POST'])
def audio_to_text():
    file = request.files['audio']
    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp:
        file.save(temp.name)
        model = genai.GenerativeModel('gemini-2.0-flash')
        audio_file = genai.upload_file(temp.name)
        res = model.generate_content([audio_file, "Transcribe the audio file into text and return the transcribed text in markdown."])
        os.unlink(temp.name)  # Clean up temp file
        return jsonify({'text': res.text})

@app.route('/api/video-to-text', methods=['POST'])
def video_to_text():
    file = request.files['video']
    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp:
        file.save(temp.name)
        model = genai.GenerativeModel('gemini-2.5-flash')
        video_file = genai.upload_file(temp.name)
        res = model.generate_content([video_file, "Describe the video file into text and return the generated text in markdown."])
        os.unlink(temp.name)  
        return jsonify({'text': res.text})

if __name__ == '__main__':
    app.run(debug=True)
