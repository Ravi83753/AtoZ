# How to Run the Application Locally

## Important: Navigate to the Correct Directory

The project has **two separate applications**:
- **Backend** → `backend/` folder
- **Frontend** → `frontend/` folder

Each has its own `package.json` file. You need to navigate to the correct folder before running npm commands.

---

## Step 1: Start the Backend

### Open PowerShell and run:

```powershell
# Navigate to backend folder
cd C:\Users\ravik\OneDrive\Desktop\AtoZ\backend

# Install dependencies (first time only)
npm install

# Start the backend server
npm start
```

**Backend will run on:** `http://localhost:5000`

**Keep this terminal open!** The backend needs to keep running.

---

## Step 2: Start the Frontend

### Open a NEW PowerShell window and run:

```powershell
# Navigate to frontend folder
cd C:\Users\ravik\OneDrive\Desktop\AtoZ\frontend

# Install dependencies (first time only)
npm install

# Start the frontend server
npm start
```

**Frontend will run on:** `http://localhost:3000`

The browser should automatically open to `http://localhost:3000`

---

## View Your Application

1. **Open your browser**
2. **Go to:** `http://localhost:3000`
3. **You should see:**
   - Product Inventory Management System
   - Search bar and filters
   - Products table
   - Import/Export buttons

---

## Common Errors and Fixes

### Error: "Could not read package.json"

**Problem:** You're in the wrong directory.

**Solution:** Make sure you're in the correct folder:
- For backend: `cd backend`
- For frontend: `cd frontend`

### Error: "npm is not recognized"

**Problem:** Node.js/npm is not installed.

**Solution:** 
1. Download Node.js: https://nodejs.org/
2. Install it
3. Restart PowerShell
4. Verify: `npm --version`

### Error: "Port already in use"

**Problem:** Another application is using port 5000 or 3000.

**Solution:**
- Close other applications using those ports
- Or change the port in the code

### Backend not connecting

**Problem:** Frontend can't reach backend.

**Solution:**
- Make sure backend is running on `http://localhost:5000`
- Check `frontend/src/config.js` - should have:
  ```javascript
  export const API_BASE_URL = 'http://localhost:5000/api';
  ```

---

## Quick Command Reference

### Backend (Terminal 1):
```powershell
cd C:\Users\ravik\OneDrive\Desktop\AtoZ\backend
npm install
npm start
```

### Frontend (Terminal 2):
```powershell
cd C:\Users\ravik\OneDrive\Desktop\AtoZ\frontend
npm install
npm start
```

---

## Project Structure

```
AtoZ/
├── backend/          ← Backend code here (has package.json)
│   ├── package.json
│   ├── server.js
│   └── ...
├── frontend/         ← Frontend code here (has package.json)
│   ├── package.json
│   ├── src/
│   └── ...
└── README.md
```

**Remember:** Always navigate to `backend/` or `frontend/` before running npm commands!

---

## Testing the Application

1. **Import sample data:**
   - Click "Import CSV"
   - Select `sample-products.csv` from the root folder
   - Products should appear in the table

2. **Test features:**
   - Search for products
   - Filter by category
   - Edit a product (click Edit → make changes → Save)
   - View inventory history (click on a product row)
   - Export products (click Export CSV)

---

## Stop the Servers

To stop the servers:
- Press `Ctrl + C` in each terminal window
- Or close the terminal windows

---

## Next Steps

Once you've tested locally:
1. ✅ Deploy backend to Render/Railway
2. ✅ Deploy frontend to Netlify/Vercel
3. ✅ Share your live URLs

Good luck! 🚀

