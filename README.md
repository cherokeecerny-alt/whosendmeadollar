WHO SENT ME A DOLLAR? v1

Files:
public/index.html
public/send.html
worker.js
wrangler.toml

Cloudflare:
1. Create a Workers KV namespace.
2. Replace REPLACE_WITH_YOUR_KV_NAMESPACE_ID in wrangler.toml.
3. Deploy the Worker with static assets.
4. Connect whosentmeadollar.com.

The /send page records a join. One browser is counted at most once every 2 hours using a cookie.
It counts joins, not confirmed Revolut payments. Country is approximate IP-country data from Cloudflare.
No raw IP address is intentionally stored by this code.
