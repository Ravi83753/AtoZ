const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Use environment variable for database path, or default to local
const dbDir = process.env.DB_PATH || __dirname;
const dbPath = path.join(dbDir, 'inventory.db');

// Ensure directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      unit TEXT,
      category TEXT,
      brand TEXT,
      stock INTEGER NOT NULL DEFAULT 0,
      status TEXT,
      image TEXT,
      UNIQUE(name)
    )`, (err) => {
      if (err) {
        console.error('Error creating products table:', err.message);
      }
    });

    db.run(`CREATE TABLE IF NOT EXISTS inventory_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      old_quantity INTEGER NOT NULL,
      new_quantity INTEGER NOT NULL,
      change_date TEXT NOT NULL,
      user_info TEXT DEFAULT 'admin',
      FOREIGN KEY(product_id) REFERENCES products(id)
    )`, (err) => {
      if (err) {
        console.error('Error creating inventory_history table:', err.message);
      }
    });
  });
}

module.exports = db;

