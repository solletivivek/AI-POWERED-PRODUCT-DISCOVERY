import json
import pymongo
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# Load cleaned data
with open("cleaned_products.json", "r", encoding="utf-8") as f:
    raw_products = json.load(f)

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["product_discovery"]
collection = db["products"]
collection.delete_many({})  # Clear old entries

# Insert with embeddings
for item in raw_products:
    embedding = model.encode(item["description"]).tolist()
    document = {
        "name": item["title"],
        "description": item["description"],
        "embedding": embedding,
    }
    collection.insert_one(document)

print("✅ Data seeded into MongoDB.")

