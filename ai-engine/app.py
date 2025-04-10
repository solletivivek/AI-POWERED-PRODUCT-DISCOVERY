from flask import Flask, request, jsonify
from search import search_products
from model import get_embedding

app = Flask(__name__)

# Sample products (Ideally, fetch from database)
products_db = [
    {"id": 1, "title": "Wireless Headphones", "description": "Noise-canceling over-ear headphones", "embedding": get_embedding("Noise-canceling over-ear headphones")},
    {"id": 2, "title": "Gaming Mouse", "description": "Ergonomic RGB gaming mouse", "embedding": get_embedding("Ergonomic RGB gaming mouse")},
]

@app.route('/search', methods=['POST'])
def search():
    data = request.json
    query = data.get("query", "")

    if not query:
        return jsonify({"error": "Query missing"}), 400

    query_embedding = get_embedding(query)
    results = search_products(query_embedding, products_db)
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
