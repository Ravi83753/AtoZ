# Fix Render Deployment Error

## Error: "Could not read package.json"

**Problem:** Render is looking for `package.json` in the root directory, but it's actually in the `backend/` folder.

## Solution: Set Root Directory in Render

### Step 1: Go to Your Render Service

1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Click on your service (the one that failed)

### Step 2: Update Settings

1. Click on **"Settings"** tab (left sidebar)
2. Scroll down to **"Build & Deploy"** section
3. Find **"Root Directory"** field
4. **Change it to:** `backend`
5. Click **"Save Changes"**

### Step 3: Manual Deploy

1. After saving, go to **"Manual Deploy"** section
2. Click **"Deploy latest commit"**
3. Wait for deployment to complete

## Alternative: Update via render.yaml

I've updated the `render.yaml` file to include `rootDir: backend`. 

**If you're using render.yaml:**
1. Commit and push the updated `render.yaml`:
   ```powershell
   cd C:\Users\ravik\OneDrive\Desktop\AtoZ
   git add backend/render.yaml
   git commit -m "Fix: Add rootDir to render.yaml"
   git push
   ```
2. Render should automatically redeploy with the correct settings

## Quick Fix Checklist

- [ ] Go to Render Dashboard → Your Service → Settings
- [ ] Find "Root Directory" field
- [ ] Set it to: `backend`
- [ ] Save Changes
- [ ] Manually deploy or wait for auto-deploy
- [ ] Verify build succeeds

## Verify It's Fixed

After updating, the build should:
- ✅ Find `package.json` in `backend/` folder
- ✅ Run `npm install` successfully
- ✅ Start the server with `npm start`

## Render Settings Summary

Make sure these are set correctly:

| Setting | Value |
|---------|-------|
| **Root Directory** | `backend` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

## Still Having Issues?

1. **Check Root Directory:** Must be exactly `backend` (lowercase, no spaces)
2. **Verify package.json exists:** Should be at `backend/package.json` in your repo
3. **Check Render logs:** Look for more specific error messages
4. **Try manual deploy:** Settings → Manual Deploy → Deploy latest commit

