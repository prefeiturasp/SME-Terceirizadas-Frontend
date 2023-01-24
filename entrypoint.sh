#!/bin/sh
# Replace string in static files
# sed -i "s/old-text/new-text/g" input.txt
# Example:
# docker run  -p 8081:80 -e API_URL="http://localhost:8000" -e SERVER_NAME="localhost" marcelomaia/terceirizadas_frontend:latest
set -xe
  : "${API_URL?Precisa de uma variavel de ambiente API_URL}"

set -xe
  : "${SERVER_NAME?Precisa de uma variavel de ambiente SERVER_NAME}"

set -xe
  : "${SENTRY_URL?Precisa de uma variavel de ambiente SENTRY_URL}"

set -xe
  : "${NODE_ENV?Precisa de uma variavel de ambiente NODE_ENV}"

set -xe
  : "${WEBSOCKET_SERVER?Precisa de uma variavel de ambiente WEBSOCKET_SERVER}"  

sed -i "s,API_URL_REPLACE_ME,$API_URL,g" /usr/share/nginx/html/static/js/main*.js
sed -i "s,SERVER_NAME,$SERVER_NAME,g" /etc/nginx/conf.d/default.conf
sed -i "s,WEBSOCKET_SERVER,$WEBSOCKET_SERVER,g" /etc/nginx/conf.d/default.conf
sed -i "s,SENTRY_URL_REPLACE_ME,$SENTRY_URL,g" /usr/share/nginx/html/static/js/main*.js
sed -i "s,NODE_ENV_REPLACE_ME,$NODE_ENV,g" /usr/share/nginx/html/static/js/main*.js

exec "$@"
