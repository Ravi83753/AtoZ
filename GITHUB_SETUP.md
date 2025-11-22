# GitHub Setup Guide

Follow these steps to push your project to GitHub.

## Step 1: Install Git (if not installed)

1. Download Git from: https://git-scm.com/download/win
2. Install with default settings
3. Restart your terminal/command prompt after installation

## Step 2: Verify Git Installation

Open PowerShell or Command Prompt and run:
```bash
git --version
```

If you see a version number, Git is installed correctly.

## Step 3: Configure Git (First Time Only)

Set your name and email (replace with your GitHub credentials):
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 4: Initialize Git Repository

Navigate to your project directory:
```bash
cd C:\Users\ravik\OneDrive\Desktop\AtoZ
```

Initialize Git:
```bash
git init
```

## Step 5: Add All Files

Add all project files:
```bash
git add .
```

## Step 6: Create Initial Commit

```bash
git commit -m "Initial commit - Product Inventory Management System"
```

## Step 7: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `inventory-management-system` (or your preferred name)
4. Description: `Product Inventory Management System - MERN Stack`
5. Choose **Public** (required for assignment submission)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

## Step 8: Connect and Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Example:**
If your GitHub username is `ravik` and repository name is `inventory-management-system`:
```bash
git remote add origin https://github.com/ravik/inventory-management-system.git
git branch -M main
git push -u origin main
```

## Step 9: Verify Upload

1. Go to your GitHub repository page
2. You should see all your files:
   - `backend/` folder
   - `frontend/` folder
   - `README.md`
   - `DEPLOYMENT.md`
   - etc.

## Troubleshooting

### Authentication Issues

If you get authentication errors, you have two options:

**Option 1: Use GitHub Desktop (Easiest)**
1. Download [GitHub Desktop](https://desktop.github.com/)
2. Sign in with your GitHub account
3. File → Add Local Repository → Select your project folder
4. Click "Publish repository"

**Option 2: Use Personal Access Token**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Copy the token
5. When pushing, use the token as password:
   ```bash
   Username: your-github-username
   Password: your-personal-access-token
   ```

### Files Not Showing

Make sure `.gitignore` is working correctly. Check that these are NOT committed:
- `node_modules/` folders
- `.env` files
- `inventory.db` file
- `uploads/` folder

### Push Rejected

If you get "push rejected", try:
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## Quick Command Summary

```bash
# Navigate to project
cd C:\Users\ravik\OneDrive\Desktop\AtoZ

# Initialize Git
git init

# Add files
git add .

# Commit
git commit -m "Initial commit - Product Inventory Management System"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push
git branch -M main
git push -u origin main
```

## Next Steps After Pushing

Once your code is on GitHub:
1. ✅ Copy your repository URL
2. ✅ Deploy backend to Render/Railway
3. ✅ Deploy frontend to Netlify/Vercel
4. ✅ Test everything works
5. ✅ Submit your assignment with:
   - GitHub repository URL
   - Live backend URL
   - Live frontend URL

Good luck! 🚀

