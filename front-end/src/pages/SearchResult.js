import React, { useState } from 'react';
import { searchProducts } from '../services/api';

const SearchResult = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const data = await searchProducts(query);
        setResults(data);
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <ul>
                {results.map((product, index) => (
                    <li key={index}>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <small>Relevance: {product.similarity.toFixed(2)}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResult;
