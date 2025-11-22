# Deployment Guide

This guide will walk you through deploying the Product Inventory Management System to production.

## Prerequisites

1. GitHub account with your code pushed to a repository
2. Accounts on:
   - **Render** or **Railway** (for backend)
   - **Netlify** or **Vercel** (for frontend)

---

## Part 1: Backend Deployment

### Option A: Deploy to Render

1. **Sign up/Login** to [Render](https://render.com)

2. **Create a New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing this project

3. **Configure the Service**:
   - **Name**: `inventory-backend` (or your preferred name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Environment Variables**:
   - Click "Environment" tab
   - Add the following:
     ```
     NODE_ENV=production
     PORT=10000
     ```
   - (Render automatically sets PORT, but you can override it)

5. **Add Persistent Disk** (Important for SQLite):
   - Go to "Disks" tab
   - Click "Link Persistent Disk"
   - Name: `inventory-db`
   - Mount Path: `/opt/render/project/src`
   - Size: 1 GB (minimum)
   - This ensures your database persists across deployments

6. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your service URL (e.g., `https://inventory-backend.onrender.com`)

### Option B: Deploy to Railway

1. **Sign up/Login** to [Railway](https://railway.app)

2. **Create a New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure the Service**:
   - Railway will auto-detect Node.js
   - Set **Root Directory** to `backend` in the service settings
   - The `railway.json` file will be automatically used

4. **Environment Variables**:
   - Go to "Variables" tab
   - Add:
     ```
     NODE_ENV=production
     PORT=10000
     ```

5. **Add Volume** (for SQLite persistence):
   - Go to "Settings" → "Volumes"
   - Click "Add Volume"
   - Mount Path: `/data`
   - Update `DB_PATH` environment variable to `/data`

6. **Deploy**:
   - Railway will automatically deploy
   - Get your service URL from the "Settings" → "Networking" tab
   - Example: `https://inventory-backend.up.railway.app`

---

## Part 2: Frontend Deployment

### Option A: Deploy to Netlify

1. **Sign up/Login** to [Netlify](https://netlify.com)

2. **Create a New Site**:
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository

3. **Configure Build Settings**:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - Netlify will auto-detect these from `netlify.toml`

4. **Environment Variables**:
   - Go to "Site settings" → "Environment variables"
   - Click "Add variable"
   - Add:
     ```
     REACT_APP_API_URL=https://your-backend-url.onrender.com/api
     ```
     (Replace with your actual backend URL from Part 1)

5. **Deploy**:
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be live at: `https://your-site-name.netlify.app`

### Option B: Deploy to Vercel

1. **Sign up/Login** to [Vercel](https://vercel.com)

2. **Create a New Project**:
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. **Configure Project Settings**:
   - **Root Directory**: `frontend`
   - **Framework Preset**: React
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - Vercel will auto-detect from `vercel.json`

4. **Environment Variables**:
   - Go to "Settings" → "Environment Variables"
   - Add:
     ```
     REACT_APP_API_URL=https://your-backend-url.onrender.com/api
     ```
     (Replace with your actual backend URL from Part 1)
   - Make sure to add it for "Production", "Preview", and "Development"

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at: `https://your-project.vercel.app`

---

## Part 3: Post-Deployment Configuration

### Update CORS Settings (if needed)

If you encounter CORS errors, update `backend/server.js`:

```javascript
app.use(cors({
  origin: ['https://your-frontend-url.netlify.app', 'https://your-frontend-url.vercel.app'],
  credentials: true
}));
```

Or for development:
```javascript
app.use(cors({
  origin: '*', // Allow all origins (for development only)
  credentials: true
}));
```

### Test Your Deployment

1. **Backend Health Check**:
   - Visit: `https://your-backend-url.onrender.com/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Frontend**:
   - Visit your frontend URL
   - Try importing the sample CSV file
   - Test search, filter, edit, and export functionality

### Update Frontend API URL

If you need to change the API URL after deployment:

**For Netlify**:
- Go to Site Settings → Environment Variables
- Update `REACT_APP_API_URL`
- Redeploy the site

**For Vercel**:
- Go to Settings → Environment Variables
- Update `REACT_APP_API_URL`
- Redeploy the site

---

## Troubleshooting

### Backend Issues

1. **Database not persisting (Render)**:
   - Ensure you've added a Persistent Disk
   - Check that the mount path is correct
   - Verify the database file is in the mounted directory

2. **Port errors**:
   - Render uses port 10000 by default
   - Railway uses the PORT environment variable
   - Make sure your code uses `process.env.PORT`

3. **Build failures**:
   - Check build logs for errors
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

### Frontend Issues

1. **API calls failing**:
   - Verify `REACT_APP_API_URL` is set correctly
   - Check browser console for CORS errors
   - Ensure backend is running and accessible

2. **Build errors**:
   - Check that all dependencies are installed
   - Verify Node.js version (should be 16+)
   - Check build logs for specific errors

3. **404 errors on routes**:
   - Ensure redirect rules are configured (handled by `netlify.toml` and `vercel.json`)
   - For Netlify: Check that `_redirects` file exists or `netlify.toml` is configured
   - For Vercel: Verify `vercel.json` routing rules

---

## Quick Reference

### Backend URLs
- **Render**: `https://your-service.onrender.com`
- **Railway**: `https://your-service.up.railway.app`

### Frontend URLs
- **Netlify**: `https://your-site.netlify.app`
- **Vercel**: `https://your-project.vercel.app`

### Environment Variables

**Backend**:
- `NODE_ENV=production`
- `PORT=10000` (Render) or auto (Railway)
- `DB_PATH=/data` (optional, for custom database location)

**Frontend**:
- `REACT_APP_API_URL=https://your-backend-url/api`

---

## Next Steps

1. ✅ Deploy backend to Render/Railway
2. ✅ Deploy frontend to Netlify/Vercel
3. ✅ Update frontend environment variable with backend URL
4. ✅ Test all functionality
5. ✅ Share your deployment URLs!

Good luck with your deployment! 🚀

