# Push Code to GitHub - Your Repository

## Your Repository URL
```
https://github.com/Ravi83753/AtoZ.git
```

## Commands to Push Your Code

Run these commands in PowerShell (one by one):

```powershell
# 1. Navigate to your project
cd C:\Users\ravik\OneDrive\Desktop\AtoZ

# 2. Initialize Git (if not already done)
git init

# 3. Add all files
git add .

# 4. Create first commit
git commit -m "Initial commit - Product Inventory Management System"

# 5. Add your GitHub repository
git remote add origin https://github.com/Ravi83753/AtoZ.git

# 6. Set main branch
git branch -M main

# 7. Push to GitHub
git push -u origin main
```

## If You Get "remote origin already exists" Error

If you see this error, run this first:
```powershell
git remote remove origin
```

Then continue with step 5 above.

## If You Get Authentication Error

You'll need to authenticate. Options:

### Option 1: Use GitHub Desktop (Easiest)
1. Download: https://desktop.github.com/
2. Sign in with your GitHub account
3. File → Add Local Repository → Select AtoZ folder
4. Click "Publish repository" → It will push automatically

### Option 2: Use Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: `AtoZ Push`
4. Select scope: `repo` (full control)
5. Click "Generate token"
6. Copy the token (you won't see it again!)
7. When pushing, use:
   - Username: `Ravi83753`
   - Password: `your-personal-access-token` (paste the token)

## Verify After Pushing

1. Go to: https://github.com/Ravi83753/AtoZ
2. You should see all your files:
   - `backend/` folder
   - `frontend/` folder
   - `README.md`
   - `DEPLOYMENT.md`
   - etc.

## Next Steps After Pushing

Once your code is on GitHub:
1. ✅ Copy repository URL: `https://github.com/Ravi83753/AtoZ`
2. ✅ Deploy backend to Render/Railway
3. ✅ Deploy frontend to Netlify/Vercel
4. ✅ Test everything
5. ✅ Submit assignment with:
   - GitHub: `https://github.com/Ravi83753/AtoZ`
   - Backend URL: (after deployment)
   - Frontend URL: (after deployment)

