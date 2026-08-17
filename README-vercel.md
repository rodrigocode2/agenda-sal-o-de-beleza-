# Deploy to Vercel (Serverless)

This project has been adapted so the backend can run as Serverless Functions on Vercel.

What I changed in branch 'vercel-serverless'
- Added `api/_db.js` using `serverless-mysql` for connections.
- Added serverless handlers: `api/auth.js`, `api/appointments.js`, `api/appointments/[id]/cancel.js`.
- Added `vercel.json` for build configuration.

How to deploy (summary)
1) Install Vercel CLI and login:
   npm i -g vercel
   vercel login

2) Link project to your Vercel team (use your team id):
   vercel link --team team_J0eMJYNG8Pui4HxlsLmtbHxc

3) Set the required Environment Variables in Vercel (Production & Preview & Development):
   - DB_HOST
   - DB_PORT
   - DB_USER
   - DB_PASS (use Vercel secrets if preferred)
   - DB_NAME
   - FRONTEND_URL
   - JWT_SECRET
   - FIREBASE_API_KEY
   - FIREBASE_AUTH_DOMAIN
   - FIREBASE_PROJECT_ID
   - FIREBASE_STORAGE_BUCKET
   - FIREBASE_MESSAGING_SENDER_ID
   - FIREBASE_APP_ID
   - STRIPE_PUBLISHABLE_KEY

   Use `vercel env add NAME value production --team <team id>` or add via the Vercel web UI.

4) Deploy to production:
   vercel --prod --team team_J0eMJYNG8Pui4HxlsLmtbHxc

Notes & Caveats
- Serverless functions have cold starts and connection limits. If you experience connection exhaustion against MySQL, consider using a serverless-friendly DB (PlanetScale) or an external backend host with connection pooling (Render, Heroku).
- Never expose secret keys in `api/config.js` — only public keys should be returned.

