# Quick Deployment Guide

## 🚀 Fast Track Deployment

### Step 1: Backend (Choose One)

#### Render (Recommended)
1. Go to [render.com](https://render.com) → New Web Service
2. Connect GitHub repo
3. Settings:
   - **Root Directory**: `backend`
   - **Build**: `npm install`
   - **Start**: `npm start`
4. Add Persistent Disk (1GB, mount: `/opt/render/project/src`)
5. Deploy → Copy URL

#### Railway
1. Go to [railway.app](https://railway.app) → New Project
2. Connect GitHub repo
3. Set **Root Directory** to `backend`
4. Deploy → Copy URL

### Step 2: Frontend (Choose One)

#### Netlify
1. Go to [netlify.com](https://netlify.com) → Add new site
2. Connect GitHub repo
3. Settings:
   - **Base directory**: `frontend`
   - **Build**: `npm run build`
   - **Publish**: `build`
4. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-url/api
   ```
5. Deploy → Copy URL

#### Vercel
1. Go to [vercel.com](https://vercel.com) → Add New Project
2. Connect GitHub repo
3. Set **Root Directory** to `frontend`
4. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-url/api
   ```
5. Deploy → Copy URL

### Step 3: Test
- Backend: Visit `https://your-backend-url/api/health`
- Frontend: Visit your frontend URL and test import/export

### 📝 Your URLs
- Backend: `________________________`
- Frontend: `________________________`
- GitHub: `________________________`

---

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

