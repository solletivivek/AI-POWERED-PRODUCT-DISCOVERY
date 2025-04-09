from flask import Flask, request, jsonify
from search import search_products
from model import get_embedding
from pymongo import MongoClient
import numpy as np
app = Flask(__name__)

# Connect to Mongo
client = MongoClient("mongodb://localhost:27017/")
db = client["product_discovery"]
collection = db["products"]
products_db = list(collection.find())

# Convert string embedding lists to numpy arrays
for product in products_db:
    product["embedding"] = np.array(product["embedding"])

@app.route('/search', methods=['POST'])
def search():
    data = request.json
    query = data.get("query", "")
    if not query:
        return jsonify({"error": "Query missing"}), 400

    query_embedding = get_embedding(query)

    # Fetch all products from Mongo
    mongo_products = list(collection.find({}, {"name": 1, "description": 1, "embedding": 1}))

    # Format for search_products
    products = [{
        "id": str(p["_id"]),
        "title": p["name"],
        "description": p["description"],
        "embedding": p["embedding"]
    } for p in mongo_products]

    results = search_products(query_embedding, products)
    return jsonify(results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)

