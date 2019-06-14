# For more details: https://stackoverflow.com/questions/48595829/how-to-pass-environment-variables-to-a-frontend-web-application
FROM node:10.15.3-alpine as builder
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run-script build
RUN npm install -g serve
RUN chmod +x /app/entrypoint.sh

# Remove `node_modules` directory, it's no more
# necessary since project is built.
# Drastically reduce image size
RUN rm -r /app/node_modules/

# replace strings, this way we can pass parameters to static files.
# docker run  -p 80:5000 -e API_URL=$API_URL_HERE front:latest
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["serve", "-s", "build", "--listen", "5000"]
