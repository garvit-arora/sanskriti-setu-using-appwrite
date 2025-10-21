# Vercel Deployment Guide

This project is optimized for deployment on Vercel with Appwrite as the backend.

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/sanskriti-setu)

## Manual Deployment

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set Environment Variables** in Vercel dashboard:
   - `REACT_APP_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1`
   - `REACT_APP_APPWRITE_PROJECT_ID=68f70975002e870821af`
   - `REACT_APP_APPWRITE_DATABASE_ID=68f70a22001388a84a91`
   - `REACT_APP_APPWRITE_USER_COLLECTION_ID=users`
   - `REACT_APP_APPWRITE_PROFILE_COLLECTION_ID=profiles`
   - `REACT_APP_APPWRITE_STORAGE_ID=68f70dae002fa4be2ae3`

## Appwrite Configuration

Make sure to add your Vercel domain to Appwrite Console:

1. Go to [Appwrite Console](https://cloud.appwrite.io/console)
2. Select your project
3. Go to **Settings → Platforms**
4. Add **Web App** platform with your Vercel domain

## Project Structure

```
├── client/                 # React application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json        # Client-specific config
├── vercel.json            # Root Vercel config
├── package.json           # Root package.json
└── .vercelignore         # Deployment ignore file
```

## Build Process

The deployment uses:
- **Framework**: Create React App
- **Build Command**: `cd client && npm run build`
- **Output Directory**: `client/build`
- **Install Command**: `npm run install-client`

## Domain Setup

After deployment, update your Appwrite platforms with the production domain:
- `https://your-app.vercel.app`

## Environment Variables

All environment variables are prefixed with `REACT_APP_` to be accessible in the React app during build time.