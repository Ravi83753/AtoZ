const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { body, validationResult } = require('express-validator');
const db = require('../db');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// GET /api/products - Get all products with optional pagination and sorting
router.get('/', (req, res) => {
  const { page = 1, limit = 100, sort = 'id', order = 'asc', category } = req.query;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const offset = (pageNum - 1) * limitNum;
  const sortOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
  
  // Validate sort column to prevent SQL injection
  const validSortColumns = ['id', 'name', 'unit', 'category', 'brand', 'stock', 'status'];
  const sortColumn = validSortColumns.includes(sort) ? sort : 'id';

  let query = 'SELECT * FROM products';
  const params = [];

  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }

  query += ` ORDER BY ${sortColumn} ${sortOrder} LIMIT ? OFFSET ?`;
  params.push(limitNum, offset);

  // Get total count for pagination
  let countQuery = 'SELECT COUNT(*) as total FROM products';
  const countParams = [];
  
  if (category) {
    countQuery += ' WHERE category = ?';
    countParams.push(category);
  }

  db.get(countQuery, countParams, (err, countResult) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    db.all(query, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        products: rows,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: countResult.total,
          totalPages: Math.ceil(countResult.total / limitNum)
        }
      });
    });
  });
});

// GET /api/products/search?name=<query> - Search products by name
router.get('/search', (req, res) => {
  const { name } = req.query;
  
  if (!name) {
    return res.status(400).json({ error: 'Name query parameter is required' });
  }

  const query = 'SELECT * FROM products WHERE name LIKE ? COLLATE NOCASE ORDER BY name ASC';
  const searchTerm = `%${name}%`;

  db.all(query, [searchTerm], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET /api/products/:id - Get single product
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(row);
  });
});

// GET /api/products/:id/history - Get inventory history for a product
router.get('/:id/history', (req, res) => {
  const { id } = req.params;
  
  const query = `SELECT * FROM inventory_history 
                 WHERE product_id = ? 
                 ORDER BY change_date DESC`;

  db.all(query, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// PUT /api/products/:id - Update product
router.put('/:id', [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('unit').optional(),
  body('category').optional(),
  body('brand').optional(),
  body('status').optional(),
  body('image').optional()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, unit, category, brand, stock, status, image } = req.body;

  // First, get the current product data
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if name is being changed and if it's unique
    if (name && name !== product.name) {
      db.get('SELECT id FROM products WHERE name = ? COLLATE NOCASE', [name], (err, existing) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (existing && existing.id !== parseInt(id)) {
          return res.status(400).json({ error: 'Product name must be unique' });
        }
        updateProduct();
      });
    } else {
      updateProduct();
    }

    function updateProduct() {
      const oldStock = product.stock;
      const newStock = stock !== undefined ? parseInt(stock) : oldStock;

      // Build update query dynamically
      const updates = [];
      const values = [];

      if (name !== undefined) {
        updates.push('name = ?');
        values.push(name);
      }
      if (unit !== undefined) {
        updates.push('unit = ?');
        values.push(unit);
      }
      if (category !== undefined) {
        updates.push('category = ?');
        values.push(category);
      }
      if (brand !== undefined) {
        updates.push('brand = ?');
        values.push(brand);
      }
      if (stock !== undefined) {
        updates.push('stock = ?');
        values.push(newStock);
      }
      if (status !== undefined) {
        updates.push('status = ?');
        values.push(status);
      }
      if (image !== undefined) {
        updates.push('image = ?');
        values.push(image);
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      values.push(id);
      const query = `UPDATE products SET ${updates.join(', ')} WHERE id = ?`;

      db.run(query, values, function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // Track inventory history if stock changed
        if (oldStock !== newStock) {
          const historyQuery = `INSERT INTO inventory_history 
                               (product_id, old_quantity, new_quantity, change_date, user_info) 
                               VALUES (?, ?, ?, ?, ?)`;
          const now = new Date().toISOString();
          db.run(historyQuery, [id, oldStock, newStock, now, req.body.changedBy || 'admin'], (err) => {
            if (err) {
              console.error('Error logging inventory history:', err);
            }
          });
        }

        // Return updated product
        db.get('SELECT * FROM products WHERE id = ?', [id], (err, updatedProduct) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json(updatedProduct);
        });
      });
    }
  });
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

// POST /api/products - Create new product
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('unit').optional(),
  body('category').optional(),
  body('brand').optional(),
  body('status').optional(),
  body('image').optional()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, unit, category, brand, stock, status, image } = req.body;

  // Check if product with same name exists
  db.get('SELECT id FROM products WHERE name = ? COLLATE NOCASE', [name], (err, existing) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (existing) {
      return res.status(400).json({ error: 'Product name must be unique' });
    }

    const query = `INSERT INTO products (name, unit, category, brand, stock, status, image) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [name, unit || null, category || null, brand || null, stock, status || null, image || null], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      db.get('SELECT * FROM products WHERE id = ?', [this.lastID], (err, newProduct) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json(newProduct);
      });
    });
  });
});

// GET /api/products/export - Export products as CSV
router.get('/export', (req, res) => {
  db.all('SELECT * FROM products ORDER BY id ASC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Convert to CSV
    const headers = ['name', 'unit', 'category', 'brand', 'stock', 'status', 'image'];
    let csv = headers.join(',') + '\n';

    rows.forEach(row => {
      const values = headers.map(header => {
        const value = row[header] || '';
        // Escape commas and quotes in CSV
        if (value.toString().includes(',') || value.toString().includes('"')) {
          return `"${value.toString().replace(/"/g, '""')}"`;
        }
        return value;
      });
      csv += values.join(',') + '\n';
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="products.csv"');
    res.status(200).send(csv);
  });
});

// POST /api/products/import - Import products from CSV
router.post('/import', upload.single('csvFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const results = {
    added: 0,
    skipped: 0,
    duplicates: []
  };

  const products = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      products.push(row);
    })
    .on('end', () => {
      let processed = 0;
      const total = products.length;

      if (total === 0) {
        fs.unlinkSync(filePath);
        return res.status(400).json({ error: 'CSV file is empty' });
      }

      products.forEach((product, index) => {
        const name = (product.name || '').trim();
        const unit = (product.unit || '').trim();
        const category = (product.category || '').trim();
        const brand = (product.brand || '').trim();
        const stock = parseInt(product.stock) || 0;
        const status = (product.status || '').trim();
        const image = (product.image || '').trim();

        if (!name) {
          results.skipped++;
          processed++;
          if (processed === total) {
            finishImport();
          }
          return;
        }

        // Check for duplicate (case-insensitive)
        db.get('SELECT id, name FROM products WHERE name = ? COLLATE NOCASE', [name], (err, existing) => {
          if (err) {
            console.error('Error checking duplicate:', err);
            results.skipped++;
            processed++;
            if (processed === total) {
              finishImport();
            }
            return;
          }

          if (existing) {
            results.skipped++;
            results.duplicates.push({
              name: existing.name,
              existingId: existing.id
            });
            processed++;
            if (processed === total) {
              finishImport();
            }
          } else {
            // Insert new product
            const query = `INSERT INTO products (name, unit, category, brand, stock, status, image) 
                           VALUES (?, ?, ?, ?, ?, ?, ?)`;
            
            db.run(query, [name, unit || null, category || null, brand || null, stock, status || null, image || null], (err) => {
              if (err) {
                console.error('Error inserting product:', err);
                results.skipped++;
              } else {
                results.added++;
              }
              
              processed++;
              if (processed === total) {
                finishImport();
              }
            });
          }
        });
      });

      function finishImport() {
        // Clean up uploaded file
        fs.unlinkSync(filePath);
        res.json(results);
      }
    })
    .on('error', (err) => {
      fs.unlinkSync(filePath);
      res.status(500).json({ error: 'Error parsing CSV file: ' + err.message });
    });
});

// GET /api/products/categories/list - Get unique categories
router.get('/categories/list', (req, res) => {
  db.all('SELECT DISTINCT category FROM products WHERE category IS NOT NULL AND category != "" ORDER BY category ASC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const categories = rows.map(row => row.category);
    res.json(categories);
  });
});

module.exports = router;

