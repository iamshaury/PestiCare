from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import numpy as np
import json
import os

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model('plant_disease_model.h5')
with open('class_indices.json') as f:
    class_indices = json.load(f)
labels = {v: k for k, v in class_indices.items()}

simple_labels = {
    "Pepper__bell___Bacterial_spot": {
        "name": "Bell Pepper - Bacterial Spot",
        "advice": "Remove affected leaves and avoid overhead watering.",
        "symptoms": "Small, water-soaked, dark spots on leaves and fruit, often with yellow halos.",
        "causes": "Bacterial infection (Xanthomonas campestris), often spread by splashing water.",
        "prevention": "Use disease-free seeds, avoid overhead watering, and rotate crops.",
        "treatment": "Remove and destroy infected plant parts. Apply copper-based bactericides if needed."
    },
    "Pepper__bell___healthy": {
        "name": "Bell Pepper - Healthy",
        "advice": "Your plant is healthy! Keep up the good care.",
        "symptoms": "No visible symptoms. Leaves are green and fruit is firm.",
        "causes": "Proper watering, sunlight, and nutrients.",
        "prevention": "Continue regular care and monitor for pests or unusual spots.",
        "treatment": "No treatment needed."
    },
    "Potato___Early_blight": {
        "name": "Potato - Early Blight",
        "advice": "Remove infected leaves and use recommended fungicide.",
        "symptoms": "Dark brown spots with concentric rings on older leaves, yellowing around spots.",
        "causes": "Fungal infection (Alternaria solani), often due to wet conditions.",
        "prevention": "Rotate crops, avoid overhead watering, and remove plant debris.",
        "treatment": "Remove affected leaves, apply recommended fungicide, and improve air circulation."
    },
    "Potato___Late_blight": {
        "name": "Potato - Late Blight",
        "advice": "Remove and destroy infected plants. Avoid wetting leaves.",
        "symptoms": "Large, irregular brown lesions on leaves and stems, white mold on undersides.",
        "causes": "Fungal-like organism (Phytophthora infestans), thrives in cool, wet weather.",
        "prevention": "Plant resistant varieties, ensure good drainage, and avoid overhead watering.",
        "treatment": "Remove and destroy infected plants. Apply fungicides if detected early."
    },
    "Potato___healthy": {
        "name": "Potato - Healthy",
        "advice": "Your plant is healthy! Keep up the good care.",
        "symptoms": "No visible symptoms. Leaves are green and healthy.",
        "causes": "Proper watering, sunlight, and nutrients.",
        "prevention": "Continue regular care and monitor for pests or unusual spots.",
        "treatment": "No treatment needed."
    },
    "Tomato_Bacterial_spot": {
        "name": "Tomato - Bacterial Spot",
        "advice": "Remove affected leaves and avoid overhead watering.",
        "symptoms": "Small, water-soaked spots on leaves, stems, and fruit, which may turn brown and dry.",
        "causes": "Bacterial infection (Xanthomonas spp.), spread by water and contaminated tools.",
        "prevention": "Use disease-free seeds, avoid overhead watering, and disinfect tools.",
        "treatment": "Remove infected parts, apply copper-based bactericides, and improve air circulation."
    },
    "Tomato_Early_blight": {
        "name": "Tomato - Early Blight",
        "advice": "Remove infected leaves and use fungicide if needed.",
        "symptoms": "Dark brown spots with concentric rings on lower leaves, yellowing around spots.",
        "causes": "Fungal infection (Alternaria solani), often due to wet conditions.",
        "prevention": "Avoid overhead watering, rotate crops, and remove plant debris.",
        "treatment": "Remove affected leaves, apply recommended fungicide, and improve air circulation."
    },
    "Tomato_Late_blight": {
        "name": "Tomato - Late Blight",
        "advice": "Remove and destroy infected plants. Avoid wetting leaves.",
        "symptoms": "Large, irregular, water-soaked lesions on leaves and stems, white mold on undersides.",
        "causes": "Fungal-like organism (Phytophthora infestans), thrives in cool, wet weather.",
        "prevention": "Plant resistant varieties, ensure good drainage, and avoid overhead watering.",
        "treatment": "Remove and destroy infected plants. Apply fungicides if detected early."
    },
    "Tomato_Leaf_Mold": {
        "name": "Tomato - Leaf Mold",
        "advice": "Improve air circulation and avoid overhead watering.",
        "symptoms": "Yellow spots on upper leaf surfaces, olive-green mold on undersides.",
        "causes": "Fungal infection (Passalora fulva), favored by high humidity.",
        "prevention": "Ensure good air circulation, avoid wetting leaves, and space plants properly.",
        "treatment": "Remove affected leaves and apply recommended fungicide."
    },
    "Tomato_Septoria_leaf_spot": {
        "name": "Tomato - Septoria Leaf Spot",
        "advice": "Remove affected leaves and use fungicide if needed.",
        "symptoms": "Small, circular spots with dark borders and gray centers on lower leaves.",
        "causes": "Fungal infection (Septoria lycopersici), spread by splashing water.",
        "prevention": "Avoid overhead watering, rotate crops, and remove plant debris.",
        "treatment": "Remove affected leaves and apply recommended fungicide."
    },
    "Tomato_Spider_mites_Two_spotted_spider_mite": {
        "name": "Tomato - Spider Mites",
        "advice": "Spray water to remove mites or use insecticidal soap.",
        "symptoms": "Tiny yellow or white spots on leaves, fine webbing on undersides.",
        "causes": "Infestation by two-spotted spider mites, often in hot, dry conditions.",
        "prevention": "Keep plants well-watered and monitor regularly.",
        "treatment": "Spray with water, use insecticidal soap or miticides if needed."
    },
    "Tomato__Target_Spot": {
        "name": "Tomato - Target Spot",
        "advice": "Remove infected leaves and use recommended fungicide.",
        "symptoms": "Brown spots with concentric rings on leaves, may cause leaf drop.",
        "causes": "Fungal infection (Corynespora cassiicola), favored by warm, humid conditions.",
        "prevention": "Avoid overhead watering, space plants, and remove debris.",
        "treatment": "Remove affected leaves and apply recommended fungicide."
    },
    "Tomato__Tomato_YellowLeaf__Curl_Virus": {
        "name": "Tomato - Yellow Leaf Curl Virus",
        "advice": "Remove infected plants and control whiteflies.",
        "symptoms": "Upward curling of leaves, yellowing, and stunted growth.",
        "causes": "Viral infection spread by whiteflies.",
        "prevention": "Control whiteflies, use resistant varieties, and remove infected plants.",
        "treatment": "Remove and destroy infected plants. Control whiteflies with insecticides."
    },
    "Tomato__Tomato_mosaic_virus": {
        "name": "Tomato - Mosaic Virus",
        "advice": "Remove infected plants and disinfect tools.",
        "symptoms": "Mottled light and dark green patterns on leaves, distorted growth.",
        "causes": "Viral infection, spread by contact and contaminated tools.",
        "prevention": "Disinfect tools, wash hands, and use resistant varieties.",
        "treatment": "Remove infected plants and disinfect tools thoroughly."
    },
    "Tomato_healthy": {
        "name": "Tomato - Healthy",
        "advice": "Your plant is healthy! Keep up the good care.",
        "symptoms": "No visible symptoms. Leaves are green and fruit is firm.",
        "causes": "Proper watering, sunlight, and nutrients.",
        "prevention": "Continue regular care and monitor for pests or unusual spots.",
        "treatment": "No treatment needed."
    }
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
        'simple_name': simple.get("name", ""),
        'advice': simple.get("advice", ""),
        'symptoms': simple.get("symptoms", ""),
        'causes': simple.get("causes", ""),
        'prevention': simple.get("prevention", ""),
        'treatment': simple.get("treatment", ""),
        'confidence': confidence
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)