FROM nginx:1.27-alpine

COPY ["Innvestiga Landing.html", "/usr/share/nginx/html/index.html"]
COPY assets /usr/share/nginx/html/assets

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
