FROM nginx:alpine
COPY portal /usr/share/nginx/html/portal
COPY source /usr/share/nginx/html/source
COPY test /usr/share/nginx/html/test
COPY nginx/esmile.conf /etc/nginx/conf.d/default.conf
