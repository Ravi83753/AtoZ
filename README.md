# Product Inventory Management System

A full-stack MERN application for managing product inventory with search, filtering, inline editing, CSV import/export, and inventory change history tracking.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Deployment**: 
  - Backend: Render / Railway / Fly.io
  - Frontend: Netlify / Vercel

## Features

### Core Features
- ✅ Product search and filtering by name and category
- ✅ Products table with all required columns (Image, Name, Unit, Category, Brand, Stock, Status, Actions)
- ✅ Inline editing of products (except Image & ID)
- ✅ CSV import functionality with duplicate detection
- ✅ CSV export functionality
- ✅ Inventory history tracking and display
- ✅ Stock status color coding (Green for In Stock, Red for Out of Stock)
- ✅ Delete product functionality

### Bonus Features
- ✅ Server-side pagination and sorting
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Proper error handling and user feedback (toasts)
- ✅ Loading states

## Project Structure

```
AtoZ/
├── backend/
│   ├── routes/
│   │   └── products.js      # Product API routes
│   ├── uploads/             # Temporary CSV upload directory
│   ├── db.js                # Database connection and initialization
│   ├── server.js            # Express server setup
│   ├── package.json
│   └── .env                 # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js           # Main application component
│   │   ├── App.css          # Application styles
│   │   ├── config.js        # API configuration
│   │   └── index.js         # React entry point
│   └── package.json
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults are used):
```env
PORT=5000
```

4. Start the development server:
```bash
npm run dev
```

Or for production:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file for production (optional for local development):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products (supports pagination, sorting, filtering)
  - Query params: `page`, `limit`, `sort`, `order`, `category`
- `GET /api/products/search?name=<query>` - Search products by name
- `GET /api/products/:id` - Get single product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products` - Create new product

### Import/Export
- `GET /api/products/export` - Export all products as CSV
- `POST /api/products/import` - Import products from CSV (multipart/form-data)

### History
- `GET /api/products/:id/history` - Get inventory history for a product

### Categories
- `GET /api/products/categories/list` - Get unique categories

## Deployment

📖 **For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

### Quick Deployment Summary

**Backend (Render/Railway)**:
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add persistent disk/volume for SQLite database
7. Deploy and note your backend URL

**Frontend (Netlify/Vercel)**:
1. Push code to GitHub
2. Connect repository to Netlify/Vercel
3. Set root directory to `frontend`
4. Build command: `npm run build`
5. Publish directory: `build`
6. Add environment variable: `REACT_APP_API_URL` = your backend URL + `/api`
7. Deploy

**Configuration files are already included:**
- `backend/render.yaml` - Render configuration
- `backend/railway.json` - Railway configuration
- `frontend/netlify.toml` - Netlify configuration
- `frontend/vercel.json` - Vercel configuration

## CSV Format

The CSV file for import should have the following columns:
- `name` (required)
- `unit`
- `category`
- `brand`
- `stock` (required, must be a number)
- `status`
- `image`

Example:
```csv
name,unit,category,brand,stock,status,image
Product 1,kg,Electronics,Brand A,100,Active,https://example.com/image1.jpg
Product 2,pieces,Clothing,Brand B,50,Active,
```

## Usage

1. **Search Products**: Use the search bar to filter products by name
2. **Filter by Category**: Select a category from the dropdown
3. **Edit Product**: Click the "Edit" button on any product row, make changes, and click "Save"
4. **Delete Product**: Click the "Delete" button (confirmation required)
5. **View History**: Click on any product row to view its inventory change history
6. **Import CSV**: Click "Import CSV" button and select a CSV file
7. **Export CSV**: Click "Export CSV" to download all products as CSV
8. **Sort**: Click on table headers to sort by that column
9. **Pagination**: Use the pagination controls at the bottom to navigate through pages

## Development Notes

- The database file (`inventory.db`) is created automatically on first run
- CSV uploads are stored temporarily in the `uploads/` directory
- All API responses follow RESTful conventions
- Error handling is implemented throughout the application
- The frontend uses optimistic updates for better UX

## License

ISC

