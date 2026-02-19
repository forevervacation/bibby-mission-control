# 🚀 Deploy Mission Control to Vercel

## Option 1: Deploy via Vercel CLI (Fastest)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to the project:
```bash
cd /data/.openclaw/workspace/mission-control
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Login to your Vercel account
   - Link to existing project or create new
   - Set environment variables when prompted

5. Add these environment variables in Vercel:
```
NEXT_PUBLIC_SUPABASE_URL=https://gudlagwcivsngddpoekf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1ZGxhZ3djaXZzbmdkZHBvZWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MjE5ODUsImV4cCI6MjA4NzA5Nzk4NX0.eWf7KFPp2zVk9ZcnYEyewwRn7b2aMJgQQK70EYXppPM
GA_PROPERTY_ID=514974974
```

## Option 2: Deploy via GitHub + Vercel (Recommended)

1. Create a new GitHub repo at https://github.com/new
   - Name: `mission-control` or `bibby-mission-control`
   - Private or Public (your choice)

2. Push the code:
```bash
cd /data/.openclaw/workspace/mission-control
git remote add origin https://github.com/YOUR_USERNAME/mission-control.git
git branch -M main
git push -u origin main
```

3. Go to https://vercel.com/new
   - Import your GitHub repo
   - Add environment variables (same as above)
   - Click Deploy

## Environment Variables

Make sure to add these in Vercel dashboard under Settings > Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://gudlagwcivsngddpoekf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1ZGxhZ3djaXZzbmdkZHBvZWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MjE5ODUsImV4cCI6MjA4NzA5Nzk4NX0.eWf7KFPp2zVk9ZcnYEyewwRn7b2aMJgQQK70EYXppPM
GA_PROPERTY_ID = 514974974
```

## After Deployment

Your Mission Control will be live at:
`https://your-project-name.vercel.app`

Features:
- ✅ Real-time task management
- 📊 Live Bibby analytics
- 📝 Content pipeline
- 📅 Calendar & scheduling
- 🎯 Quick action dashboard

Built by Scotty 🚀
