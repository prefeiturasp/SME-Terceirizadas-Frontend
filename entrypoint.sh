#!/bin/sh
# Replace string in static files
# sed -i "s/old-text/new-text/g" input.txt
# Example:
# docker run  -p 8000:80 -e API_URL="http:\/\/mysite.com\/api\/v1" -e JWT_AUTH="ufo" -e USER_URL="user url" marcelomaia/terceirizadas_frontend:latest
set -xe
  : "${API_URL?Need an api url}"

sed -i "s/API_URL_REPLACE_ME/$API_URL/g" /usr/share/nginx/html/static/js/main*.js
sed -i "s/JWT_AUTH_REPLACE_ME/$JWT_AUTH/g" /usr/share/nginx/html/static/js/main*.js
sed -i "s/USER_URL_REPLACE_ME/$USER_URL/g" /usr/share/nginx/html/static/js/main*.js
sed -i "s/API_MOCK_REPLACE_ME/$API_MOCK/g" /usr/share/nginx/html/static/js/main*.js

exec "$@"
