from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from pymongo import MongoClient
from model import get_embedding
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["product_discovery"]
collection = db["products"]

# Load products and convert embeddings to NumPy arrays
products_db = list(collection.find())
for product in products_db:
    product["embedding"] = np.array(product["embedding"])

# Cosine similarity search
def search_products(query_embedding, products):
    results = []
    for product in products:
        score = cosine_similarity([query_embedding], [product["embedding"]])[0][0]
        results.append({
            "name": product["name"],
            "description": product["description"],
            "score": float(score)
        })
    results.sort(key=lambda x: x["score"], reverse=True)
    return results[:10]

# Search endpoint
@app.route('/search', methods=['POST'])
def search():
    try:
        data = request.get_json()
        query = data.get("query", "")

        if not query.strip():
            return jsonify({"error": "Query cannot be empty"}), 400

        query_embedding = get_embedding(query)
        results = search_products(query_embedding, products_db)

        return jsonify(results)

    except Exception as e:
        print("❌ Error:", str(e))
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)

