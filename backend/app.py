from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import numpy as np
import json
import os

app = Flask(__name__)
CORS(app)

# Load model and class indices
model = tf.keras.models.load_model('plant_disease_model.h5')
with open('class_indices.json') as f:
    class_indices = json.load(f)
labels = {v: k for k, v in class_indices.items()}

# Simple, farmer-friendly labels and advice
simple_labels = {
    "Tomato_healthy": {
        "name": "Tomato - Healthy",
        "advice": "Your plant is healthy! Keep up the good care."
    },
    "Tomato_Early_blight": {
        "name": "Tomato - Early Blight",
        "advice": "Remove infected leaves and use fungicide if needed."
    },
    "Tomato_Late_blight": {
        "name": "Tomato - Late Blight",
        "advice": "Remove and destroy infected plants. Avoid wetting leaves."
    },
    "Tomato_Leaf_Mold": {
        "name": "Tomato - Leaf Mold",
        "advice": "Improve air circulation and avoid overhead watering."
    },
    "Tomato_Septoria_leaf_spot": {
        "name": "Tomato - Septoria Leaf Spot",
        "advice": "Remove affected leaves and use fungicide if needed."
    },
    "Tomato_Spider_mites_Two_spotted_spider_mite": {
        "name": "Tomato - Spider Mites",
        "advice": "Spray water to remove mites or use insecticidal soap."
    },
    "Tomato__Target_Spot": {
        "name": "Tomato - Target Spot",
        "advice": "Remove infected leaves and use recommended fungicide."
    },
    "Tomato__Tomato_YellowLeaf__Curl_Virus": {
        "name": "Tomato - Yellow Leaf Curl Virus",
        "advice": "Remove infected plants and control whiteflies."
    },
    "Tomato__Tomato_mosaic_virus": {
        "name": "Tomato - Mosaic Virus",
        "advice": "Remove infected plants and disinfect tools."
    },
    "Pepper__bell___Bacterial_spot": {
        "name": "Bell Pepper - Bacterial Spot",
        "advice": "Remove affected leaves and avoid overhead watering."
    },
    "Pepper__bell___healthy": {
        "name": "Bell Pepper - Healthy",
        "advice": "Your plant is healthy! Keep up the good care."
    },
    "Potato___Early_blight": {
        "name": "Potato - Early Blight",
        "advice": "Remove infected leaves and use recommended fungicide."
    },
    "Potato___Late_blight": {
        "name": "Potato - Late Blight",
        "advice": "Remove and destroy infected plants. Avoid wetting leaves."
    },
    "Potato___healthy": {
        "name": "Potato - Healthy",
        "advice": "Your plant is healthy! Keep up the good care."
    }
    # Add more classes as needed, matching your new class_indices.json
}


@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    file = request.files['image']

    img = Image.open(file.stream).convert('RGB').resize((128, 128))
    arr = np.array(img) / 255.0
    arr = arr.reshape((1, 128, 128, 3))

    pred = model.predict(arr)

    class_idx = int(np.argmax(pred))
    class_name = labels[class_idx]
    confidence = float(np.max(pred))
    simple = simple_labels.get(class_name, {"name": class_name, "advice": ""})
    return jsonify({
        'class': class_name,
        'simple_name': simple["name"],
        'advice': simple["advice"],
        'confidence': confidence
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)