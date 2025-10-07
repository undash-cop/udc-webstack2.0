# 🚀 Quick Start: Cloudflare Workers Migration

## Immediate Testing (5 minutes)

### 1. Install Dependencies
```bash
npm run install:worker
```

### 2. Test Worker Locally
```bash
# In one terminal - start the worker
npm run worker:dev

# In another terminal - test the worker
npm run worker:test
```

### 3. Test with Frontend
```bash
# Start both frontend and worker
npm run dev:worker
```

Then visit: `http://localhost:5173/careers` and try submitting a job application.

## Full Deployment (15 minutes)

### 1. Set up Cloudflare Account
- Go to [cloudflare.com](https://cloudflare.com) and sign up
- Install Wrangler CLI: `npm install -g wrangler`
- Login: `wrangler login`

### 2. Set up R2 Storage
- Go to Cloudflare Dashboard → R2 Object Storage
- Create bucket named `resumes`
- Create API token with R2 permissions
- Note your Account ID

### 3. Configure Secrets
```bash
cd workers
wrangler secret put R2_ACCOUNT_ID
wrangler secret put R2_ACCESS_KEY_ID  
wrangler secret put R2_SECRET_ACCESS_KEY
wrangler secret put R2_PUBLIC_URL
```

### 4. Deploy Worker
```bash
npm run worker:deploy
```

### 5. Update Frontend
Edit `src/config/api.ts` and replace the worker URL with your actual deployed URL.

## Verification Checklist

- [ ] Health check works: `GET /api/health`
- [ ] JSON application works: `POST /api/applications/json`
- [ ] File upload works: `POST /api/applications`
- [ ] Emails are sent (check your email)
- [ ] Files are stored in R2
- [ ] Frontend can submit applications

## Troubleshooting

### Worker won't start locally
```bash
# Check if wrangler is installed
wrangler --version

# Reinstall if needed
npm install -g wrangler
```

### R2 upload fails
- Verify R2 bucket exists and is named `resumes`
- Check API token has R2 permissions
- Verify secrets are set correctly

### Emails not sending
- Check SendGrid API key is set
- Verify FROM_EMAIL and HR_EMAIL in wrangler.toml
- Check worker logs: `npm run worker:tail`

### Frontend can't connect
- Verify worker is running: `npm run worker:dev`
- Check API URL in `src/config/api.ts`
- Check browser console for CORS errors

## Need Help?

1. Check `CLOUDFLARE_DEPLOYMENT.md` for detailed instructions
2. Check `MIGRATION_COMPARISON.md` for architecture details
3. Run `npm run worker:tail` to see real-time logs
4. Test individual endpoints with the test script

## Success! 🎉

Once everything works, you can:
- Remove the Python backend folder
- Update your deployment scripts
- Enjoy 90% cost savings and better performance!
