# CSV Import Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: "No file uploaded" Error

**Possible Causes:**
- File picker was cancelled
- File not selected properly
- Browser security blocking file access

**Solutions:**
1. Make sure you actually select a file (don't just click Cancel)
2. Try a different browser (Chrome, Firefox, Edge)
3. Check browser console (F12) for errors
4. Make sure the file is a `.csv` file

---

### Issue 2: "Invalid file type" Error

**Cause:** File is not a CSV file

**Solution:**
- Make sure the file extension is `.csv`
- Open the file in a text editor and verify it's comma-separated
- Use the sample file: `sample-products.csv` from the project root

---

### Issue 3: "Error parsing CSV file"

**Possible Causes:**
- CSV file is corrupted
- Wrong CSV format
- File encoding issues

**Solutions:**
1. **Check CSV format:**
   - First line should be headers: `name,unit,category,brand,stock,status,image`
   - Each line should have values separated by commas
   - No empty lines between data rows

2. **Use the sample file format:**
   ```csv
   name,unit,category,brand,stock,status,image
   Product 1,kg,Electronics,Brand A,100,Active,https://example.com/image.jpg
   Product 2,pieces,Clothing,Brand B,50,Active,
   ```

3. **Check file encoding:**
   - Save as UTF-8 encoding
   - Avoid special characters if possible

---

### Issue 4: "Network Error" or "Connection Failed"

**Possible Causes:**
- Backend server is not running
- Wrong API URL
- CORS issues

**Solutions:**

1. **Check if backend is running:**
   - Visit: `http://localhost:5000/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Check API URL:**
   - Open browser console (F12)
   - Look for the API call in Network tab
   - Verify it's going to: `http://localhost:5000/api/products/import`

3. **For deployed version:**
   - Make sure `REACT_APP_API_URL` environment variable is set correctly
   - Should be: `https://your-backend-url.onrender.com/api`

---

### Issue 5: "Timeout" Error

**Cause:** File is too large or server is slow

**Solutions:**
- Try with a smaller CSV file first
- Check backend logs for errors
- Increase timeout if needed (currently 30 seconds)

---

### Issue 6: Import Works But No Products Appear

**Possible Causes:**
- All products were skipped (duplicates or invalid data)
- Products table not refreshing
- Database issue

**Solutions:**

1. **Check import response:**
   - Look at the toast message
   - Should show: "Import completed: X added"
   - If it says "0 added", check why products were skipped

2. **Check for duplicates:**
   - Products with the same name (case-insensitive) are skipped
   - Check the duplicates count in the toast message

3. **Verify CSV data:**
   - Make sure `name` field is not empty (required)
   - Make sure `stock` is a valid number

4. **Refresh the page:**
   - Sometimes the table needs manual refresh
   - Click the search bar or change filter

---

### Issue 7: Backend Error - "ENOENT: no such file or directory"

**Cause:** Uploads directory doesn't exist or can't be created

**Solution:**
- Backend should auto-create the `uploads/` directory
- Check backend logs for errors
- Make sure backend has write permissions

---

## Testing the Import

### Step 1: Use Sample File

1. Use the provided `sample-products.csv` file
2. It's in the root directory of the project
3. Contains 10 sample products

### Step 2: Check Browser Console

1. Press F12 to open Developer Tools
2. Go to "Console" tab
3. Look for any error messages
4. Go to "Network" tab
5. Click "Import CSV" and select file
6. Look for the `/products/import` request
7. Check the response

### Step 3: Check Backend Logs

If running locally:
```powershell
# In backend terminal, you should see:
# - File upload received
# - Processing CSV...
# - Products added/skipped
```

---

## CSV File Format Requirements

### Required Format:

```csv
name,unit,category,brand,stock,status,image
Product Name,kg,Category,Brand Name,100,Active,https://example.com/image.jpg
```

### Field Details:

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| `name` | ✅ Yes | Text | Must be unique (case-insensitive) |
| `unit` | No | Text | e.g., "kg", "pieces", "liters" |
| `category` | No | Text | e.g., "Electronics", "Clothing" |
| `brand` | No | Text | Brand name |
| `stock` | ✅ Yes | Number | Must be ≥ 0 |
| `status` | No | Text | e.g., "Active", "Inactive" |
| `image` | No | URL | Image URL (can be empty) |

### Example Valid CSV:

```csv
name,unit,category,brand,stock,status,image
Laptop,pieces,Electronics,Dell,50,Active,https://example.com/laptop.jpg
Mouse,pieces,Electronics,Logitech,100,Active,
Keyboard,pieces,Electronics,Logitech,75,Active,https://example.com/keyboard.jpg
```

---

## Quick Test Checklist

- [ ] Backend is running (`http://localhost:5000/api/health` works)
- [ ] Frontend is running (`http://localhost:3000` works)
- [ ] CSV file has correct format (headers + data)
- [ ] CSV file has `.csv` extension
- [ ] File is not empty
- [ ] At least one product has a `name` field
- [ ] Browser console shows no errors
- [ ] Network tab shows successful POST request

---

## Still Not Working?

1. **Check browser console** (F12 → Console tab)
2. **Check network requests** (F12 → Network tab)
3. **Check backend logs** (terminal where backend is running)
4. **Try with sample file** (`sample-products.csv`)
5. **Test backend directly:**
   ```bash
   curl -X POST http://localhost:5000/api/products/import \
     -F "csvFile=@sample-products.csv"
   ```

---

## Recent Fixes Applied

✅ Fixed multer upload path (now uses absolute path)
✅ Added file type validation
✅ Improved error messages
✅ Added loading state during import
✅ Added timeout handling
✅ Better error logging

If you're still having issues after these fixes, check the browser console and backend logs for specific error messages.

