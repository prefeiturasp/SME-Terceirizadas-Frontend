#!/bin/sh
# Replace string in static files
# sed -i "s/old-text/new-text/g" input.txt
# Example:
# docker run  -p 8081:80 -e API_URL="http://localhost:8000" -e API_MOCK="http://localhost:3004" marcelomaia/terceirizadas_frontend:latest
set -xe
  : "${API_URL?Need an api url}"

sed -i "s,API_URL_REPLACE_ME,$API_URL,g" /app/build/static/js/main*.js
sed -i "s,API_MOCK_REPLACE_ME,$API_MOCK,g" /app/build/static/js/main*.js

exec "$@"
