# Push to GitHub - Repository Name: AtoZ

## Quick Commands

Run these commands in PowerShell (in your project directory):

```powershell
# 1. Initialize Git (if not already done)
git init

# 2. Add all files
git add .

# 3. Create first commit
git commit -m "Initial commit - Product Inventory Management System"

# 4. Add your GitHub repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/AtoZ.git

# 5. Set main branch
git branch -M main

# 6. Push to GitHub
git push -u origin main
```

## Example

If your GitHub username is `ravik`, the command would be:
```powershell
git remote add origin https://github.com/ravik/AtoZ.git
```

## If You Get Authentication Error

You'll need to authenticate. Options:

1. **Use GitHub Desktop** (Easiest):
   - Download: https://desktop.github.com/
   - Sign in → File → Add Local Repository → Select AtoZ folder
   - Click "Publish repository"

2. **Use Personal Access Token**:
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token → Select `repo` scope
   - Use token as password when pushing

## Verify

After pushing, visit: `https://github.com/YOUR_USERNAME/AtoZ`

You should see all your files there!

