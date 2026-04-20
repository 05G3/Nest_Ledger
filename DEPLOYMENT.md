# NestLedger Deployment Guide

## Overview
- **Backend (Node.js/Express + MongoDB)**: Deploy on Render
- **Frontend (Static HTML)**: Deploy on Vercel

---

## Step 1: Prepare for Git

### 1.1 Create .gitignore file
Create a `.gitignore` file in the root directory:

```
node_modules/
.env
.DS_Store
*.log
tmp/
```

### 1.2 Update server/.env for production
Your `server/.env` should contain:
```
JWT_SECRET=your_super_secure_key
MONGO_URI=mongodb+srv://dorarakesh8_db_user:iE46c0lbVMyjgUH9@cluster0.sg67yze.mongodb.net/nestledger?retryWrites=true&w=majority
PORT=5001
```

### 1.3 Initialize Git and push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nestledger.git
git push -u origin main
```

---

## Step 2: Deploy Backend on Render

### 2.1 Create a Render account
Go to https://render.com and sign up/login

### 2.2 Create a new Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure the service:

**Build & Deploy Settings:**
- **Name**: nestledger-api
- **Region**: Singapore (closest to India)
- **Branch**: main
- **Runtime**: Node
- **Build Command**: `cd server && npm install`
- **Start Command**: `node server/server.js`

**Environment Variables:**
Add these in the "Environment" section:
```
JWT_SECRET=your_super_secure_key
MONGO_URI=mongodb+srv://dorarakesh8_db_user:iE46c0lbVMyjgUH9@cluster0.sg67yze.mongodb.net/nestledger?retryWrites=true&w=majority
PORT=5001
NODE_ENV=production
```

### 2.3 Deploy
Click "Create Web Service". Render will deploy your backend.

### 2.4 Get your backend URL
After deployment, Render will give you a URL like:
```
https://nestledger-api.onrender.com
```

**Important**: Copy this URL - you'll need it for the frontend.

### 2.5 Whitelist Render's IP in MongoDB Atlas
1. Go to MongoDB Atlas → Network Access
2. Add Render's IP address (or use 0.0.0.0/0 to allow all - less secure)
3. The Render IP will be shown in the deployment logs or you can use 0.0.0.0/0 for testing

---

## Step 3: Update Frontend for Production

### 3.1 Update API URL in frontend
Open `client/hostel-payments.html` and replace all occurrences of:
```
http://localhost:5001
```
with your Render backend URL:
```
https://nestledger-api.onrender.com
```

Find and replace these in the file:
- Line ~904: `http://localhost:5001/api/auth/login` → `https://nestledger-api.onrender.com/api/auth/login`
- Line ~933: `http://localhost:5001/api/auth/register` → `https://nestledger-api.onrender.com/api/auth/register`
- Line ~1204: `http://localhost:5001/api/payments` → `https://nestledger-api.onrender.com/api/payments`
- Line ~1251: `http://localhost:5001/api/payments` → `https://nestledger-api.onrender.com/api/payments`

### 3.2 Commit and push changes
```bash
git add .
git commit -m "Update frontend API URL for production"
git push
```

---

## Step 4: Deploy Frontend on Vercel

### 4.1 Create a Vercel account
Go to https://vercel.com and sign up/login

### 4.2 Import your repository
1. Click "Add New Project"
2. Import your GitHub repository
3. Configure the project:

**Project Settings:**
- **Framework Preset**: Other
- **Root Directory**: `./client`
- **Build Command**: (leave empty - no build needed)
- **Output Directory**: `./` (or leave empty)

### 4.3 Deploy
Click "Deploy". Vercel will deploy your static HTML file.

### 4.4 Get your frontend URL
After deployment, Vercel will give you a URL like:
```
https://nestledger.vercel.app
```

---

## Step 5: Update MongoDB Atlas CORS (if needed)

If you face CORS issues, update MongoDB Atlas:
1. Go to MongoDB Atlas → Database → Connect
2. Add your Vercel domain to allowed origins if needed

---

## Summary of URLs

After deployment:
- **Backend**: https://nestledger-api.onrender.com
- **Frontend**: https://nestledger.vercel.app
- **Database**: MongoDB Atlas (already configured)

---

## Troubleshooting

### Backend fails to start:
- Check Render logs for errors
- Verify environment variables are correct
- Ensure MongoDB IP is whitelisted

### Frontend can't connect to backend:
- Verify API URL in frontend matches Render URL
- Check browser console for CORS errors
- Ensure backend is running

### Database connection issues:
- Whitelist Render's IP in MongoDB Atlas
- Check connection string format
- Verify database credentials

---

## Post-Deployment Checklist

- [ ] Backend deployed on Render and accessible
- [ ] Frontend deployed on Vercel and accessible
- [ ] User registration works
- [ ] User login works
- [ ] Payments can be added
- [ ] Data persists in MongoDB
- [ ] MongoDB IP whitelisted for Render
