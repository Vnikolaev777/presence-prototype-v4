# Presence Prototype

A React + Vite + TypeScript prototype for the Presence product.

---

## 🚀 Share it live (anyone, anywhere — free)

### Option A — Vercel (recommended, ~3 minutes)

1. Push this repo to GitHub (see below)
2. Go to [vercel.com](https://vercel.com) → **Sign up with GitHub** (free)
3. Click **Add New Project** → import this repository
4. Click **Deploy** — Vercel auto-detects Vite, no config needed
5. You get a URL like `https://presence-prototype.vercel.app` — share it!

Every push to `main` auto-redeploys. The `vercel.json` is already configured.

---

### Option B — Netlify (same idea)

1. Push this repo to GitHub (see below)
2. Go to [netlify.com](https://netlify.com) → **Sign up with GitHub** (free)
3. Click **Add new site → Import from Git** → select this repo
4. Leave all settings as-is (the `netlify.toml` handles them)
5. Click **Deploy site** → get a URL → share it!

---

### Option C — GitHub Pages (no extra account needed)

1. Push this repo to GitHub (see below)
2. In repo **Settings → Pages → Source → GitHub Actions**
3. The `.github/workflows/deploy.yml` runs automatically on every push
4. URL: `https://[your-username].github.io/[repo-name]/`

> **Note:** For GitHub Pages, add `base: '/your-repo-name/'` to `vite.config.ts`

---

## 📤 Push to GitHub (one-time setup)

> ⚠️ `~/Documents/Presence Prototype` is **not** the project directory — replace `path/to/project` below with the actual path on your machine.

1. Create a new repo at **https://github.com/new** (name it `presence-prototype`)
2. Run these commands in your terminal:

```bash
cd path/to/project
git remote add origin https://github.com/YOUR_USERNAME/presence-prototype.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

After that, every future update is just:

```bash
cd path/to/project && git add . && git commit -m "Update" && git push
```

---

## 💻 Run locally

```bash
cd path/to/project && npm install && npm run dev
```

Open [http://localhost:5173](http://localhost:5173)
