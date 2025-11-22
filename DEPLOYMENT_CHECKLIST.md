# Deployment Checklist

Use this checklist to ensure a smooth deployment process.

## Pre-Deployment

- [ ] Code is pushed to GitHub repository
- [ ] All dependencies are listed in `package.json`
- [ ] `.env` files are not committed (checked in `.gitignore`)
- [ ] Database schema is properly initialized
- [ ] All API endpoints are tested locally
- [ ] Frontend connects to backend successfully

## Backend Deployment

### Render
- [ ] Account created and logged in
- [ ] New Web Service created
- [ ] GitHub repository connected
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Environment variables set:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=10000` (optional, Render sets this automatically)
- [ ] Persistent Disk added:
  - [ ] Name: `inventory-db`
  - [ ] Mount path: `/opt/render/project/src`
  - [ ] Size: 1 GB minimum
- [ ] Service deployed successfully
- [ ] Backend URL noted: `https://your-service.onrender.com`
- [ ] Health check works: `https://your-service.onrender.com/api/health`

### Railway
- [ ] Account created and logged in
- [ ] New project created from GitHub
- [ ] Root directory set to `backend`
- [ ] Environment variables set:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=10000`
- [ ] Volume added (optional, for database persistence):
  - [ ] Mount path: `/data`
  - [ ] `DB_PATH=/data` environment variable set
- [ ] Service deployed successfully
- [ ] Backend URL noted: `https://your-service.up.railway.app`
- [ ] Health check works: `https://your-service.up.railway.app/api/health`

## Frontend Deployment

### Netlify
- [ ] Account created and logged in
- [ ] New site created from GitHub
- [ ] Base directory set to `frontend`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `build`
- [ ] Environment variable set:
  - [ ] `REACT_APP_API_URL=https://your-backend-url/api`
- [ ] Site deployed successfully
- [ ] Frontend URL noted: `https://your-site.netlify.app`

### Vercel
- [ ] Account created and logged in
- [ ] New project created from GitHub
- [ ] Root directory set to `frontend`
- [ ] Framework preset: React
- [ ] Build command: `npm run build`
- [ ] Output directory: `build`
- [ ] Environment variable set:
  - [ ] `REACT_APP_API_URL=https://your-backend-url/api`
  - [ ] Added for Production, Preview, and Development
- [ ] Project deployed successfully
- [ ] Frontend URL noted: `https://your-project.vercel.app`

## Post-Deployment Testing

### Backend Tests
- [ ] Health endpoint returns OK
- [ ] GET `/api/products` returns products list
- [ ] GET `/api/products/search?name=test` works
- [ ] POST `/api/products/import` accepts CSV file
- [ ] GET `/api/products/export` downloads CSV
- [ ] PUT `/api/products/:id` updates product
- [ ] GET `/api/products/:id/history` returns history

### Frontend Tests
- [ ] Page loads without errors
- [ ] Products table displays correctly
- [ ] Search functionality works
- [ ] Category filter works
- [ ] Inline editing works (Edit → Save)
- [ ] Delete product works
- [ ] Import CSV works
- [ ] Export CSV works
- [ ] Inventory history sidebar opens on row click
- [ ] Responsive design works on mobile/tablet
- [ ] Pagination works (if applicable)
- [ ] Sorting works (click column headers)

### Integration Tests
- [ ] Frontend can communicate with backend
- [ ] No CORS errors in browser console
- [ ] All API calls return expected data
- [ ] Error messages display correctly
- [ ] Toast notifications appear

## Final Steps

- [ ] Update README with deployment URLs
- [ ] Test the complete user flow:
  1. Import sample CSV
  2. Search for a product
  3. Edit a product
  4. View inventory history
  5. Export products
- [ ] Document any issues and solutions
- [ ] Share deployment URLs:
  - [ ] Backend URL: `________________________`
  - [ ] Frontend URL: `________________________`
  - [ ] GitHub Repository: `________________________`

## Common Issues & Solutions

### Issue: CORS errors
**Solution**: Update `backend/server.js` CORS configuration or add `FRONTEND_URL` environment variable

### Issue: Database not persisting
**Solution**: Ensure persistent disk/volume is properly mounted and `DB_PATH` is set correctly

### Issue: Build fails
**Solution**: Check Node.js version compatibility, ensure all dependencies are in `package.json`

### Issue: API calls fail
**Solution**: Verify `REACT_APP_API_URL` is set correctly and backend is accessible

### Issue: 404 on routes
**Solution**: Ensure redirect rules are configured in `netlify.toml` or `vercel.json`

---

✅ **All checked? You're ready to submit!**

