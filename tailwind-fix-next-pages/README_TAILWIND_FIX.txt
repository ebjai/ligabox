LDB — Tailwind One‑Shot Fix (Pages Router)
=========================================
WHAT THIS DOES
--------------
- Ensures Tailwind is loaded globally
- Scans the correct folders (pages, components, app)
- Sets your Home2035 page as the homepage (/)
- Provides a safe Brand component fallback (won't break if you already have one)

HOW TO APPLY (ONE DROP-IN)
--------------------------
1) Unzip this at the ROOT of your repo (same level as package.json).
   It will create/overwrite:
     - tailwind.config.js
     - postcss.config.js
     - styles/globals.css
     - pages/_app.tsx
     - pages/index.tsx
     - components/Brand.tsx (safe fallback)

2) Commit & push → Vercel auto-deploys.
   Open your site and refresh.

OPTIONAL (only if Tailwind isn't installed yet)
------------------------------------------------
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p    # (this repo already includes the files; this just ensures deps exist)

NOTES
-----
- If you already have a Brand component, keep yours; this fallback won't be used.
- If you also use the /app router, the config still works (it scans /app too).
- You can delete README_TAILWIND_FIX.txt after applying.
