#!/bin/sh
# Replace string in static files
# sed -i 's/old-text/new-text/g' input.txt
# ps: use slashes to scape var="\/folder1\/folder2\/folder3"

sed -i 's/"API_URL_REPLACE_ME"/"$API_URL"/g' /build/static/js/main*.js
sed -i 's/"JWT_AUTH_REPLACE_ME"/"$JWT_AUTH"/g' /build/static/js/main*.js
sed -i 's/"USER_URL_REPLACE_ME"/"$USER_URL"/g' /build/static/js/main*.js
sed -i 's/"API_MOCK_REPLACE_ME"/"$API_MOCK"/g' /build/static/js/main*.js
exec "$@"
