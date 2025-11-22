# Fix Network Error - CSV Import

## Quick Diagnosis Steps

### Step 1: Check if Backend is Running

**Open a browser and visit:**
```
http://localhost:5000/api/health
```

**Expected response:**
```json
{"status":"OK","message":"Server is running"}
```

**If you get an error:**
- ❌ Backend is NOT running
- ✅ **Solution:** Start the backend (see Step 2)

---

### Step 2: Start the Backend Server

**Open PowerShell and run:**

```powershell
cd C:\Users\ravik\OneDrive\Desktop\AtoZ\backend
npm start
```

**You should see:**
```
Server is running on port 5000
Connected to SQLite database
```

**Keep this terminal window open!** The backend must keep running.

---

### Step 3: Verify API URL

**Check your frontend configuration:**

1. Open: `frontend/src/config.js`
2. Should contain:
   ```javascript
   export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
   ```

3. **If running locally:** Should be `http://localhost:5000/api`
4. **If deployed:** Should be your backend URL + `/api`

---

### Step 4: Check Browser Console

**When you try to import:**

1. Press **F12** to open Developer Tools
2. Go to **Console** tab
3. Look for error messages
4. Check for:
   - `Starting CSV import...`
   - `API URL: http://localhost:5000/api/products/import`
   - Any red error messages

**Common errors you might see:**

| Error | Meaning | Solution |
|-------|---------|----------|
| `ECONNREFUSED` | Backend not running | Start backend server |
| `ERR_NETWORK` | Cannot reach backend | Check if backend is running |
| `CORS error` | Cross-origin issue | Backend CORS is already configured |
| `404 Not Found` | Wrong API URL | Check `config.js` |

---

### Step 5: Check Network Tab

1. Press **F12** → **Network** tab
2. Click **"Import CSV"** button
3. Select a file
4. Look for the request: `products/import`
5. Click on it to see details:
   - **Status:** Should be 200 (success) or show error code
   - **Request URL:** Should be `http://localhost:5000/api/products/import`
   - **Response:** Should show JSON or error message

---

## Common Issues and Fixes

### Issue 1: "Network Error" - Backend Not Running

**Symptoms:**
- Error: `ECONNREFUSED` or `ERR_NETWORK`
- `http://localhost:5000/api/health` doesn't work

**Fix:**
```powershell
# Start backend
cd C:\Users\ravik\OneDrive\Desktop\AtoZ\backend
npm start
```

**Verify:**
- Visit: `http://localhost:5000/api/health`
- Should return: `{"status":"OK"}`

---

### Issue 2: Wrong Port

**Symptoms:**
- Backend running on different port
- Frontend trying wrong port

**Fix:**

1. **Check backend port:**
   - Look at backend terminal
   - Should say: `Server is running on port 5000`
   - If different, note the port number

2. **Update frontend config:**
   - Edit `frontend/src/config.js`
   - Change port if needed:
     ```javascript
     export const API_BASE_URL = 'http://localhost:YOUR_PORT/api';
     ```
   - Restart frontend

---

### Issue 3: CORS Error

**Symptoms:**
- Error: `CORS policy` or `Access-Control-Allow-Origin`
- Request fails in browser console

**Fix:**
- Backend already has CORS configured
- If still getting errors, check `backend/server.js`
- Make sure CORS middleware is before routes

---

### Issue 4: Frontend and Backend on Different Ports

**Make sure:**
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`
- Both running simultaneously

---

## Step-by-Step Test

### Test 1: Backend Health Check

```powershell
# In browser or PowerShell
curl http://localhost:5000/api/health
```

**Or visit in browser:**
```
http://localhost:5000/api/health
```

**Expected:** `{"status":"OK","message":"Server is running"}`

---

### Test 2: Test Import Endpoint Directly

**Using curl (if installed):**
```powershell
curl -X POST http://localhost:5000/api/products/import -F "csvFile=@sample-products.csv"
```

**Or use Postman/Insomnia:**
- Method: POST
- URL: `http://localhost:5000/api/products/import`
- Body: form-data
- Key: `csvFile` (type: File)
- Value: Select `sample-products.csv`

---

### Test 3: Check Frontend Console

1. Open frontend: `http://localhost:3000`
2. Press F12 → Console
3. Click "Import CSV"
4. Select file
5. Look for console logs:
   - `Starting CSV import...`
   - `API URL: http://localhost:5000/api/products/import`
   - Any errors

---

## Quick Fix Checklist

- [ ] Backend is running (`npm start` in backend folder)
- [ ] Backend health check works (`http://localhost:5000/api/health`)
- [ ] Frontend is running (`npm start` in frontend folder)
- [ ] API URL is correct (`http://localhost:5000/api`)
- [ ] Both terminals are open (backend + frontend)
- [ ] No firewall blocking port 5000
- [ ] Browser console shows no CORS errors
- [ ] Network tab shows the request

---

## Still Not Working?

### Debug Mode:

1. **Open browser console (F12)**
2. **Try importing CSV**
3. **Copy the full error message**
4. **Check:**
   - Error code (ECONNREFUSED, ERR_NETWORK, etc.)
   - Request URL
   - Response status

### Check Backend Logs:

In the backend terminal, you should see:
- File upload received
- Processing CSV...
- Products added

If you don't see these, the request isn't reaching the backend.

---

## Quick Command Reference

### Start Backend:
```powershell
cd C:\Users\ravik\OneDrive\Desktop\AtoZ\backend
npm start
```

### Start Frontend:
```powershell
cd C:\Users\ravik\OneDrive\Desktop\AtoZ\frontend
npm start
```

### Test Backend:
```
http://localhost:5000/api/health
```

### Test Import API:
```
POST http://localhost:5000/api/products/import
```

---

## Most Common Solution

**90% of the time, the issue is: Backend is not running!**

1. ✅ Make sure backend terminal is open
2. ✅ Run `npm start` in backend folder
3. ✅ Verify: `http://localhost:5000/api/health` works
4. ✅ Then try importing CSV again

Let me know what error you see in the browser console (F12) and I can help further!

