# How to View Your Webpage

## Overview

You need to deploy both:
1. **Backend** (Node.js API) → Render/Railway
2. **Frontend** (React App) → Netlify/Vercel

Then you can access your webpage through the frontend URL.

---

## Step 1: Deploy Backend First

### On Render:

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Create New Web Service** (if not done):
   - Click "New +" → "Web Service"
   - Connect GitHub repo: `https://github.com/Ravi83753/AtoZ`
   - **Important Settings:**
     - **Root Directory**: `backend`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   - Add Persistent Disk (1GB) for database
   - Deploy

3. **Wait for deployment** (takes 2-5 minutes)
4. **Copy your Backend URL** (e.g., `https://inventory-backend.onrender.com`)

5. **Test Backend**:
   - Visit: `https://your-backend-url.onrender.com/api/health`
   - Should show: `{"status":"OK","message":"Server is running"}`

---

## Step 2: Deploy Frontend

### On Netlify:

1. **Go to Netlify**: https://app.netlify.com
2. **Add New Site**:
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub → Select `Ravi83753/AtoZ`
   - **Settings:**
     - **Base directory**: `frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `build`
   - **Environment Variables**:
     - Click "Show advanced"
     - Add variable:
       - Key: `REACT_APP_API_URL`
       - Value: `https://your-backend-url.onrender.com/api`
       (Replace with your actual backend URL from Step 1)
   - Click "Deploy site"

3. **Wait for deployment** (takes 2-5 minutes)
4. **Copy your Frontend URL** (e.g., `https://your-site-name.netlify.app`)

### On Vercel:

1. **Go to Vercel**: https://vercel.com
2. **Add New Project**:
   - Click "Add New..." → "Project"
   - Import `Ravi83753/AtoZ`
   - **Settings:**
     - **Root Directory**: `frontend`
     - **Framework Preset**: React
   - **Environment Variables**:
     - Add: `REACT_APP_API_URL` = `https://your-backend-url.onrender.com/api`
   - Click "Deploy"

3. **Wait for deployment**
4. **Copy your Frontend URL** (e.g., `https://your-project.vercel.app`)

---

## Step 3: View Your Webpage

### After Frontend Deployment:

1. **Open your Frontend URL** in a browser:
   - Netlify: `https://your-site-name.netlify.app`
   - Vercel: `https://your-project.vercel.app`

2. **You should see:**
   - Product Inventory Management System header
   - Search bar and filters
   - Products table (empty initially)
   - Import/Export buttons

3. **Test the application:**
   - Click "Import CSV" → Upload `sample-products.csv`
   - Search for products
   - Edit a product
   - View inventory history
   - Export products

---

## Quick Access URLs

After deployment, you'll have:

| Service | URL | Purpose |
|---------|-----|---------|
| **Backend** | `https://your-backend.onrender.com` | API server |
| **Frontend** | `https://your-site.netlify.app` | **← This is your webpage!** |

**The Frontend URL is what you share and use to view your application.**

---

## Local Testing (Before Deployment)

If you want to test locally first:

### Start Backend:
```powershell
cd C:\Users\ravik\OneDrive\Desktop\AtoZ\backend
npm install
npm start
```
Backend runs on: `http://localhost:5000`

### Start Frontend:
```powershell
cd C:\Users\ravik\OneDrive\Desktop\AtoZ\frontend
npm install
npm start
```
Frontend runs on: `http://localhost:3000`

**Open browser**: `http://localhost:3000` to see your webpage locally.

---

## Troubleshooting

### Can't see webpage after deployment?

1. **Check Frontend URL:**
   - Make sure you're using the **Frontend URL** (Netlify/Vercel), not backend URL
   - Backend URL shows API responses, not the webpage

2. **Check Environment Variable:**
   - Frontend must have `REACT_APP_API_URL` set to your backend URL
   - Format: `https://your-backend-url.onrender.com/api`

3. **Check Build Status:**
   - Go to Netlify/Vercel dashboard
   - Check if build succeeded (green checkmark)
   - If failed, check build logs

4. **Check Browser Console:**
   - Press F12 → Console tab
   - Look for errors (CORS, API connection issues)

### Backend not working?

1. **Test backend health:**
   - Visit: `https://your-backend-url.onrender.com/api/health`
   - Should return JSON response

2. **Check Render logs:**
   - Go to Render dashboard → Your service → Logs
   - Look for errors

---

## Summary

**To view your webpage:**
1. ✅ Deploy backend → Get backend URL
2. ✅ Deploy frontend → Get frontend URL (with backend URL in env var)
3. ✅ Open frontend URL in browser → **See your webpage!**

The **Frontend URL** is your live webpage that you can share and use.

