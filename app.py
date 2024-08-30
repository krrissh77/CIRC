from flask import Flask, request, jsonify
import subprocess
import os
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

UPLOAD_FOLDER = '/Users/suraj/Documents/workspace/krish/Yolo/react-chatbot/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.form.get('message')
    image = request.files.get('image')

    # Handle the uploaded image if it exists
    if image:
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
        image.save(image_path)

        command = f"ollama run llava {user_message} {image_path} 2>/dev/null"
        logging.info(f"Executing command: {command}")
    else:
        # Handle text-only messages
        command = f'ollama run llama2 "{user_message}"'

    # Run the LLaVA model
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    logging.info("Command executed")

    if result.returncode != 0:
        return jsonify({"response": "Error running LLaVA model"}), 500

    bot_message = result.stdout.strip()
    return jsonify({"response": bot_message})

if __name__ == '__main__':
    app.run(debug=True)
