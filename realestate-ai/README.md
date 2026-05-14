# 🏢 RealEstate AI Agent — Demo

A **fully functional** real estate AI assistant with built-in dummy data. No API keys required — everything works out of the box.

## ✨ Features

- 🔎 **Property Search** — 25+ realistic listings across 10 US cities
- 🎯 **Lead Generation** — Buyer/seller qualification framework
- 📝 **Listing Writer** — Professional property descriptions
- 💰 **ROI Calculator** — Investment return analysis
- 📊 **Market Analysis** — Price trends & insights
- 🏡 **Airbnb Optimizer** — Short-term rental strategy

## 🎬 Demo Cities Available

Houston TX • Austin TX • Dallas TX • Miami FL • Orlando FL • Los Angeles CA • New York NY • Chicago IL • Phoenix AZ • Seattle WA

---

## 🚀 Deployment Guide

### Step 1: Push Code to GitHub

#### Option A — GitHub Web (easiest):

1. Go to **GitHub.com** and log in
2. Click the "**+**" icon top-right → "**New repository**"
3. Repository name: `realestate-ai-agent` (or any name)
4. Choose **Public** or **Private**
5. ❌ **DO NOT** check "Add a README" (we already have one)
6. Click **"Create repository"**

#### Option B — Push from local terminal:

```bash
# Go into the project folder
cd realestate-ai

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Replace with your GitHub repo URL
git remote add origin https://github.com/YOUR-USERNAME/realestate-ai-agent.git
git branch -M main
git push -u origin main
```

#### Option C — Upload files directly via GitHub web (easiest of all):

1. After creating the new repo
2. Click the "**uploading an existing file**" link
3. Drag and drop all the files
4. Write a commit message
5. Click "**Commit changes**"

---

### Step 2: Deploy to Vercel

1. Go to **vercel.com**
2. Click **"Sign Up"** → select **"Continue with GitHub"**
3. Allow permissions
4. On the dashboard, click **"Add New..."** → **"Project"**
5. **"Import"** your `realestate-ai-agent` repository
6. Settings (defaults are fine):
   - **Framework:** Next.js (auto-detected)
   - **Root Directory:** `./`
   - **Build Command:** `next build` (default)
   - **Environment Variables:** **Leave EMPTY** ✅
7. Click the **"Deploy"** button
8. Wait 1-2 minutes…
9. ✅ **Done!** You'll get a live URL: `your-project.vercel.app`

---

### Step 3: Custom Domain (Optional)

Vercel dashboard → Project → **Settings** → **Domains** → add your domain.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Open in browser
# http://localhost:3000
```

---

## 📁 Project Structure

```
realestate-ai/
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   └── globals.css        # Global styles
├── components/
│   └── RealEstateAgent.jsx # Main component
├── lib/
│   ├── dummyProperties.js  # 25+ fake listings
│   └── fakeAI.js           # Fake AI engine
├── package.json
├── next.config.js
└── README.md
```

---

## 🎨 Customization

### Add your own properties:
Add new objects in `lib/dummyProperties.js`. Follow the existing format.

### Change AI responses:
Edit `MODE_INTROS`, `LEAD_RESPONSES`, etc. in `lib/fakeAI.js`.

### Change theme colors:
Update the `color` field in the `AGENT_MODES` array in `components/RealEstateAgent.jsx`.

---

## 🔄 Connecting Real APIs (Future)

If you ever want to use real APIs:

1. Create a `.env.local` file:
   ```
   NEXT_PUBLIC_GROQ_KEY=your_groq_key
   NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key
   ```

2. Replace `lib/fakeAI.js` with the original `callGroq` function
3. Replace `lib/dummyProperties.js` with real RapidAPI calls

But **fake data is perfectly fine for a demo** — fast, free, no rate limits!

---

## 📜 License

MIT — use it however you like.

## 💬 Support

If you run into any issues, open a GitHub issue.

---

**Built with:** Next.js 14 · React 18 · Pure CSS-in-JS · Zero external dependencies for the AI part 🎯
