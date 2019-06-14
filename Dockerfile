# just to create `build` directory
FROM node:10.15.3-alpine as builder
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run-script build

FROM node:10.15.3-alpine
WORKDIR /app
COPY --from=builder /app/build /app/build

RUN npm install -g serve
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# replace strings, this way we can pass parameters to static files.
# For more details:
# https://stackoverflow.com/questions/48595829/how-to-pass-environment-variables-to-a-frontend-web-application
# docker run  -p 80:5000 -e API_URL=$API_URL_HERE front:latest
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["serve", "-s", "build", "--listen", "5000"]
