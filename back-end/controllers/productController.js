const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

const addProduct = async (req, res) => {
  const { name, description, price, image, category } = req.body;
  try {
    const product = await Product.create({ name, description, price, image, category });
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
};

module.exports = { getProducts, addProduct };