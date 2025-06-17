// server.js - Full Express.js Product API with middleware, validation, and advanced features

const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - Parse JSON
app.use(bodyParser.json());

// Middleware - Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware - Authentication
function authenticate(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === 'my-secret-key') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized. Missing or invalid API key.' });
  }
}

// Middleware - Validation
function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  if (
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    typeof price !== 'number' ||
    typeof category !== 'string' ||
    typeof inStock !== 'boolean'
  ) {
    return res.status(400).json({ error: 'Invalid product data.' });
  }
  next();
}

// In-memory product list
let products = [
  { id: '1', name: 'Laptop', description: 'High-performance laptop with 16GB RAM', price: 1200, category: 'electronics', inStock: true },
  { id: '2', name: 'Smartphone', description: 'Latest model with 128GB storage', price: 800, category: 'electronics', inStock: true },
  { id: '3', name: 'Coffee Maker', description: 'Programmable coffee maker with timer', price: 50, category: 'kitchen', inStock: false }
];

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API!');
});

// GET all products with filtering, pagination, search
app.get('/api/products', (req, res) => {
  let { category, search, page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let filtered = [...products];

  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  res.json({ total: filtered.length, page, limit, data: paginated });
});

// GET product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// POST create new product
app.post('/api/products', authenticate, validateProduct, (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
app.put('/api/products/:id', authenticate, validateProduct, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE product
app.delete('/api/products/:id', authenticate, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  const removed = products.splice(index, 1);
  res.json(removed[0]);
});

// GET statistics
app.get('/api/products/stats', (req, res) => {
  const countByCategory = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  res.json({ total: products.length, countByCategory });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export app for tests
module.exports = app;
