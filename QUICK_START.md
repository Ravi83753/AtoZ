# Quick Start - Run the Application

## ⚠️ Important: Always Navigate to the Correct Folder First!

The project has **two separate folders** with their own `package.json` files:
- `backend/` - Node.js backend
- `frontend/` - React frontend

---

## Step 1: Start Backend Server

### Open PowerShell and run these commands:

```powershell
# Navigate to backend folder
cd C:\Users\ravik\OneDrive\Desktop\AtoZ\backend

# Install dependencies (if not already done)
npm install

# Start the server
npm start
```

**✅ Backend will run on:** `http://localhost:5000`

**Keep this terminal window open!** The server needs to keep running.

---

## Step 2: Start Frontend (New Terminal Window)

### Open a NEW PowerShell window and run:

```powershell
# Navigate to frontend folder
cd C:\Users\ravik\OneDrive\Desktop\AtoZ\frontend

# Install dependencies (if not already done)
npm install

# Start the frontend
npm start
```

**✅ Frontend will run on:** `http://localhost:3000`

The browser should automatically open!

---

## View Your Application

1. **Open browser** (or it opens automatically)
2. **Go to:** `http://localhost:3000`
3. **You should see** your Product Inventory Management System

---

## Common Error Fix

### ❌ Error: "Could not read package.json"

**Problem:** You're running `npm install` from the wrong directory.

**Solution:** Make sure you're in the correct folder:

**For Backend:**
```powershell
cd C:\Users\ravik\OneDrive\Desktop\AtoZ\backend
npm install
```

**For Frontend:**
```powershell
cd C:\Users\ravik\OneDrive\Desktop\AtoZ\frontend
npm install
```

---

## Project Structure

```
AtoZ/                          ← Root (NO package.json here!)
├── backend/                   ← Backend code (package.json HERE)
│   ├── package.json          ← npm install here
│   ├── server.js
│   └── ...
└── frontend/                  ← Frontend code (package.json HERE)
    ├── package.json          ← npm install here
    └── ...
```

---

## Quick Command Reference

### Terminal 1 (Backend):
```powershell
cd C:\Users\ravik\OneDrive\Desktop\AtoZ\backend
npm install
npm start
```

### Terminal 2 (Frontend):
```powershell
cd C:\Users\ravik\OneDrive\Desktop\AtoZ\frontend
npm install
npm start
```

---

## Stop the Servers

Press `Ctrl + C` in each terminal window to stop the servers.

---

## Next: Deploy to Production

Once you've tested locally:
1. Deploy backend to Render/Railway
2. Deploy frontend to Netlify/Vercel
3. Share your live URLs

See `DEPLOYMENT.md` for detailed deployment instructions.

