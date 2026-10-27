# Deploy Ethan Helps (get a public link)

Follow these steps once. Takes about 10–15 minutes.

## 1. Create free accounts
- GitHub: https://github.com/signup
- Vercel: https://vercel.com/signup (choose “Continue with GitHub”)

## 2. Put the project on GitHub
1. On GitHub, click **New repository**
2. Name it `ethan-helps`
3. Leave it empty (no README) and create it
4. On your computer, open a terminal in the `ethan-helps` folder and run:

```bash
git init
git add .
git commit -m "Ethan Helps Phase 1"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ethan-helps.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## 3. Deploy on Vercel
1. Go to https://vercel.com/new
2. Import the `ethan-helps` repository
3. Click **Deploy** (leave settings as default)
4. Wait about a minute

You’ll get a link like:
**https://ethan-helps.vercel.app**

That link works on phones, tablets, and computers. Share it with students.

## 4. First login
- Email: ethan@ethanhelps.com
- Password: EthanOwner2026!

Go to **Admin → Users & Tiers** to create student accounts and assign Basic / Premium / Platinum.

## Optional: custom domain later
In Vercel → Project → Settings → Domains you can add something like `app.ethanhelps.com` later.
