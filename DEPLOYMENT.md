# Deployment Guide

This application is built with Vite (React), so it is a Static Site. It can be hosted on any static site hosting provider for free.

## Option 1: Vercel (Recommended) & (Easiest)

1.  **Push your code to GitHub.**
2.  Go to [Vercel.com](https://vercel.com) and sign up/login.
3.  Click **"Add New"** -> **"Project"**.
4.  Import your GitHub repository.
5.  Vercel will detect it's a Vite project.
6.  Click **"Deploy"**.
7.  Done! Your app is live.

## Option 2: Netlify

1.  **Push your code to GitHub.**
2.  Go to [Netlify.com](https://netlify.com).
3.  Click **"Add new site"** -> **"Import an existing project"**.
4.  Connect GitHub and select your repo.
5.  **Build Settings**:
    -   **Build command**: `npm run build`
    -   **Publish directory**: `dist`
6.  Click **"Deploy site"**.

## Option 3: GitHub Pages

1.  Update `vite.config.ts` to include your repo name as base:
    ```typescript
    export default defineConfig({
      plugins: [react()],
      base: '/your-repo-name/', // Add this line
    })
    ```
2.  Push code to GitHub.
3.  Go to Repo **Settings** -> **Pages**.
4.  Select Source as **GitHub Actions** (or deploy manually using `gh-pages` package).

## Important Note on Data

Since this app uses **IndexedDB** (local browser storage), your financial data is stored **only on your device**.
-   If you deploy the app, you will start with empty data on the hosted URL.
-   Data is **NOT shared** between devices.
-   Use the **Export/Import** feature in Settings to move data between devices.
