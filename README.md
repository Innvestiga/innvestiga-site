# innvestiga-site

Public landing page at `https://main.innvestiga.com`.

## Stack

- Static HTML/CSS (single file `Innvestiga Landing.html`, served as `index.html`)
- Image assets in `assets/brand/` (logos) and `assets/cities/` (hero photography)
- Containerized with `nginx:1.27-alpine`, deployed via Coolify on `esi3-prod-apps`

## Local preview

```sh
docker build -t innvestiga-site .
docker run --rm -p 8080:80 innvestiga-site
# Open http://localhost:8080
```

## Deploy

Push to `main` then trigger the Coolify deploy:

```sh
curl -X GET "https://coolify-admin.innvestiga.com/api/v1/deploy?uuid=<APP_UUID>&force=false" \
  -H "Authorization: Bearer $COOLIFY_TOKEN"
```

(Coolify webhook auto-deploy is disabled — see `esi3-migration-2026-05-session-state` memory.)
