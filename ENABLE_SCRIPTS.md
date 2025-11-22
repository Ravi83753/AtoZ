# Enable Script Execution on Windows

## Problem

Windows PowerShell may block script execution for security reasons. You might see errors like:
- "cannot be loaded because running scripts is disabled on this system"
- "Execution Policy" errors

## Solution: Change PowerShell Execution Policy

### Method 1: For Current User (Recommended - Safest)

Run PowerShell as Administrator and execute:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**What this does:**
- Allows scripts you write locally
- Requires downloaded scripts to be signed by a trusted publisher
- Only affects your user account (safest option)

### Method 2: For Current Session Only (Temporary)

If you don't want to change system settings permanently:

```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

**What this does:**
- Only affects current PowerShell session
- Resets when you close PowerShell
- Good for one-time use

### Method 3: Check Current Policy

First, check what your current policy is:

```powershell
Get-ExecutionPolicy
```

Common values:
- `Restricted` - No scripts allowed (most restrictive)
- `RemoteSigned` - Local scripts OK, remote must be signed (recommended)
- `Unrestricted` - All scripts allowed (less secure)

## Step-by-Step Instructions

### Option A: Run as Administrator

1. **Right-click** on PowerShell or Command Prompt
2. Select **"Run as Administrator"**
3. Run this command:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
4. Type `Y` when prompted
5. Close and reopen PowerShell

### Option B: Use Current Session (No Admin Needed)

1. Open PowerShell (normal, not admin)
2. Run:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
   ```
3. This only works for current session

## Verify It Works

After changing the policy, test with:

```powershell
Get-ExecutionPolicy
```

Should show: `RemoteSigned` or `Bypass`

## For npm Scripts Specifically

If you're trying to run npm scripts and getting errors:

1. **First, enable scripts** (use Method 1 or 2 above)

2. **Then run your npm commands:**
   ```powershell
   cd C:\Users\ravik\OneDrive\Desktop\AtoZ\backend
   npm install
   npm start
   ```

## Alternative: Use Command Prompt (CMD)

If PowerShell continues to give issues, you can use Command Prompt instead:

1. Open **Command Prompt** (not PowerShell)
2. Navigate to your project:
   ```cmd
   cd C:\Users\ravik\OneDrive\Desktop\AtoZ\backend
   ```
3. Run npm commands:
   ```cmd
   npm install
   npm start
   ```

CMD doesn't have the same execution policy restrictions.

## Quick Fix Commands

**For current session (no admin needed):**
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

**For permanent (requires admin):**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Troubleshooting

### "Access Denied" Error

- You need to run PowerShell as Administrator
- Right-click PowerShell → "Run as Administrator"

### Still Not Working

1. Check if you're in the right directory
2. Verify npm is installed: `npm --version`
3. Try using Command Prompt instead of PowerShell
4. Check if antivirus is blocking scripts

## Security Note

- `RemoteSigned` is the recommended setting (safe and practical)
- `Bypass` is less secure but useful for development
- `Restricted` is most secure but blocks all scripts

For development work, `RemoteSigned` is the best balance.

