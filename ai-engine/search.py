import numpy as np
from model import get_embedding


def cosine_similarity(vec1, vec2):
    """Compute cosine similarity"""
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))

def search_products(query_embedding, products):
    """Find most relevant products based on similarity"""
    for product in products:
        product['similarity'] = cosine_similarity(query_embedding, product['embedding'])

    return sorted(products, key=lambda x: x['similarity'], reverse=True)[:5]  # Top 5 matches
