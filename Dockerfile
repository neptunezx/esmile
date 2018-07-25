FROM nginx:alpine
COPY library /usr/share/nginx/html/library
COPY portal /usr/share/nginx/html/portal
COPY source /usr/share/nginx/html/source
COPY test /usr/share/nginx/html/test
COPY nginx/esmile.conf /etc/nginx/conf.d/default.conf