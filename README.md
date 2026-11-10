# Dios-con-nosotros

Static community site deployed on Vercel.

## Optional consent-based visitor log

The site asks visitors before sending a visit record to the configured Discord
webhook. After consent, the Vercel function logs the request IP and User-Agent,
the page path and UTC timestamp, and approximate location/connection metadata
from geoiplookup.io. The location provider receives the IP. Connection type is
only an estimate and does not reliably establish VPN use. The log does not
include email or Discord account identity. Rejecting does not prevent use of
the site. See `/privacidad.html` for the privacy notice.

To enable the log:

1. Create a webhook in the Discord channel intended for these logs.
2. In Vercel, open the project's **Settings → Environment Variables**.
3. Add `DISCORD_WEBHOOK_URL` with the webhook URL. Keep it out of source files,
   client-side JavaScript, and commits.
4. Redeploy the site so the serverless function receives the new variable.

The endpoint is `POST /api/visitor`; it is a Vercel Node.js Function. The
standalone `server.js` is only a static local preview server and does not run
Vercel Functions.
