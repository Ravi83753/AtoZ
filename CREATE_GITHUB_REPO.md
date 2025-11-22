# Create GitHub Repository - Step by Step

## Step 1: Create Repository on GitHub

1. **Go to GitHub.com** and sign in to your account

2. **Click the "+" icon** in the top right corner → Select **"New repository"**

3. **Fill in the details:**
   - **Repository name**: `AtoZ`
   - **Description**: `Product Inventory Management System - MERN Stack` (optional)
   - **Visibility**: Select **Public** (required for assignment)
   - **DO NOT check** any of these boxes:
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
   (We already have these files in the project)

4. **Click "Create repository"**

## Step 2: Copy Your Repository URL

After creating, GitHub will show you a page with setup instructions. 

**Your repository URL will be:**
```
https://github.com/YOUR_USERNAME/AtoZ.git
```

Replace `YOUR_USERNAME` with your actual GitHub username.

**Example:**
- If your username is `ravik`, the URL is: `https://github.com/ravik/AtoZ.git`
- If your username is `john-doe`, the URL is: `https://github.com/john-doe/AtoZ.git`

## Step 3: Push Your Code

### Using GitHub Desktop (Easiest):

1. **Download GitHub Desktop** (if not installed): https://desktop.github.com/
2. **Sign in** with your GitHub account
3. **File** → **Add Local Repository**
4. **Click "Choose..."** and navigate to: `C:\Users\ravik\OneDrive\Desktop\AtoZ`
5. **Click "Add Repository"**
6. **Click "Publish repository"** button (top right)
   - Repository name: `AtoZ`
   - Description: (optional)
   - **Uncheck** "Keep this code private" (make it Public)
   - Owner: Select your GitHub account
7. **Click "Publish Repository"**

### Using Git Commands:

If you have Git installed, run these commands:

```powershell
# Navigate to project
cd C:\Users\ravik\OneDrive\Desktop\AtoZ

# Initialize Git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Product Inventory Management System"

# Add remote (REPLACE YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/AtoZ.git

# Push
git branch -M main
git push -u origin main
```

## Step 4: Verify

1. Go to: `https://github.com/YOUR_USERNAME/AtoZ`
2. You should see all your files:
   - `backend/` folder
   - `frontend/` folder
   - `README.md`
   - `DEPLOYMENT.md`
   - etc.

## Troubleshooting

### "Repository not found" Error

**Possible causes:**
1. ❌ Repository doesn't exist yet → **Create it first** (Step 1 above)
2. ❌ Wrong username in URL → Check your GitHub username
3. ❌ Repository is private and you're not authenticated → Make it Public
4. ❌ Typo in repository name → Make sure it's exactly `AtoZ`

### "Authentication failed" Error

**Solution:**
- Use GitHub Desktop (handles authentication automatically)
- OR create a Personal Access Token:
  1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token → Select `repo` scope
  3. Copy token → Use as password when pushing

### "Remote origin already exists" Error

**Solution:**
```powershell
# Remove existing remote
git remote remove origin

# Add correct remote
git remote add origin https://github.com/YOUR_USERNAME/AtoZ.git

# Push
git push -u origin main
```

## Quick Checklist

- [ ] Created repository on GitHub.com (name: `AtoZ`, Public)
- [ ] Know your GitHub username
- [ ] Repository URL: `https://github.com/YOUR_USERNAME/AtoZ.git`
- [ ] Code pushed successfully
- [ ] Can see files on GitHub

## Need Help?

If you're still having issues:
1. **Check your GitHub username**: Go to github.com → Click your profile picture → Your username is shown
2. **Verify repository exists**: Visit `https://github.com/YOUR_USERNAME/AtoZ` (replace YOUR_USERNAME)
3. **Make sure repository is Public**: Settings → Scroll down → Change visibility to Public

